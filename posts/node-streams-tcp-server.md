---
title: Handling Slow Servers in NodeJS
date: December 15 2021
excerpt: Handling Slow servers and large payloads using Node Streams
coverImage: "/images/posts/img1.jpg"
tags: nodejs, streams, buffers
---

# Handling Slow/Fast Servers in Micro Services with NodeJS

In a micro services architecture we have different small servers, which handles some tasks and hands over the data to the next server in the chain for further processing.

This creates 2 interesting problem:

- What if the Server which has to handle data is slow in processing the data , than the server node which is producing the data?

- What if the producer produces huge payloads.

We can handle the above situations efficiently using built in NodeJS **Streams** and **Backpressure**.

Node Streams gives us the ability to send data in chunks to the server instead of sending the whole payload. It keeps the memory in control and helps us write fast servers.

Also stream have built in support to handle **Backpressure**.
When a **Backpressure** is applied the consumer(server) basically notifies the producer(server), that it is currently overloaded and stream takes care not to send more data to the server.

![Slow Server](/images/posts/StreamSlowFast.png)

Let's check how this works with a code example.

We will first write a producer which will produce large `JSON` payloads.

<br />

### Producer/Client <br/><br/>

```javascript
const data = [
  {
    _id: "6192c126465ae155e3d6f2f9",
    isactive: true,
    balance: "2,125.46",
    picture: "http://placehold.it/32x32",
    age: 30,
    eyecolor: "brown",
    name: "aguilar ruiz",
    gender: "male",
    company: "vetron",
    email: "aguilarruiz@vetron.com",
    phone: "+1 (830) 508-2418",
    address: "451 scott avenue, vincent, american samoa, 4990",
    about:
      "consequat voluptate laborum magna elit est dolor qui non. non sunt ad labore nulla anim ipsum tempor do fugiat eu ipsum fugiat cillum. laboris officia est lorem quis sit ad consequat ullamco enim occaecat nisi. in ipsum reprehenderit labore laboris reprehenderit dolore eiusmod ut dolore eiusmod. irure in reprehenderit adipisicing exercitation occaecat eu ullamco voluptate laborum ex in minim voluptate incididunt. reprehenderit aute tempor enim enim cupidatat anim aliquip cupidatat nisi et amet. do quis cillum nostrud proident sit eiusmod aliqua nisi incididunt magna.\r\n",
    registered: "2019-12-10t09:52:42 +05:00",
    latitude: 30.443211,
    longitude: 168.052318,
    tags: ["aliquip", "nulla"],
    friends: [
      { id: 0, name: "shauna juarez" },
      { id: 1, name: "alvarado bright" },
      { id: 2, name: "mendez miller" },
    ],
    greeting: "hello, aguilar ruiz! you have 8 unread messages.",
    favoritefruit: "strawberry",
  },
];

async function* genData() {
  for (let i = 0; i < 50000; i++) {
    let chunk = Array(50).fill(data[0]);
    // chunk._id = i;
    let body = JSON.stringify(chunk);
    let dataBytes = Buffer.byteLength(body);
    let buffer = Buffer.alloc(4 + dataBytes);
    buffer.writeUInt32BE(dataBytes);
    buffer.write(body, 4);
    yield buffer;
  }
}
```

Above , we have some sample JSON data , and an async generator which is generating a large payload out of the sample around 50,000 times <br />
`let chunk = Array(50).fill(data[0]);`

The rest of the code converts the Payload into Buffer and writes the length of the Payload as the 1st 4 bytes of the buffer. We will use this information to get the correct payload in the server.

The built-in **http** module of Node is an implementation of Stream under the hood, so we will use it to stream the generated data to server.

```javascript
const source = Readable.from(genData());
let options = {
  method: "POST",
  hostname: "localhost",
  port: 3000,
  path: "/",
  headers: {
    "Content-Type": "application/json",
  },
};
const request = http.request(options, (res) => {
  console.log("Request Done");
});

request.on("drain", () => {
  drainEventCalled++;
  if (drainEventCalled % 500 === 0) {
    process.nextTick(() => console.log("Drained Buffer"));
  }
});
setInterval(() => {
  console.log("rss client::", process.memoryUsage().rss / 1024 / 1024);
}, 10000);

pipeline(source, request, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Done. Drain Event Called: ", drainEventCalled);
});
```

Let's take a look into what we are doing here

- We create a Readable stream from our **generator** function
- We then create the `request` object which extends Node Streams.
- Finally , we use the built-in `pipeline` functionality of stream library to stream data to the server from the source(generator function). <br /> The `pipeline` under that hoods takes care of streaming data from one readable source to a writeable destination and abstracts away handling of backpresure and backpressure related errors.
- We want to also measure the memory usage of the Source Server and Node provides the builtin <br />
  `process.memoryUsage().rss`
  for that. Here is the official documentation of [Resident Set Size](https://nodejs.org/api/process.html#processmemoryusagerss)
- The `drain` event is called whenever the sources buffer is cleared and the data is sent to the consumer server.<br />
  Remember we are sending data in chunks to the server and when a backpressure is applied the source server will simply stop filling up its buffers with more data and _WAIT_.

That is all for the **producer/client** side of things.

We will take a look at the Server Next !

### Consumer/Slow Server

<br />
<br />

**References**

[backpressure blog](https://www.derpturkey.com/node-js-socket-backpressure-in-paused-mode-2/)
[backpressure 2](https://nodejs.org/es/docs/guides/backpressuring-in-streams/)

[streams](https://www.derpturkey.com/extending-tcp-socket-in-node-js/)
[tcpsocket](https://www.derpturkey.com/extending-tcp-socket-in-node-js/)
