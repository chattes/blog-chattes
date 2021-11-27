---
title: S3 Bucket as NFS Volume in Docker
date: November 21 2021
excerpt: We will see how we can attach an S3 Bucket as NFS Volume in Docker
---

We can attach an S3 bucket as a mounted Volume in docker.

We need to use a Plugin to achieve this.

The plugin is

[rexray/rexray](https://github.com/rexray/rexray)

We will first install the plugin

```bash
docker plugin install rexray/s3fs:latest S3FS_REGION=us-east-2 S3FS_OPTIONS="allow_other,iam_role=auto,umask=000" --grant-all-permissions
```

We will have to install the plugin as so , it gives access to the plugin to S3.

Once installed we can check using

```bash
docker plugin ls
```

Now we can mount the S3 bucket using the volume driver like below
Lets call our volume **maps-openmaps-schools**

```bash
docker run -ti --volume-driver=rexray/s3fs -v maps-openmaps-schools:/data ubuntu sleep infinity
```

Thats it the Volume has been mounted from our S3 Bucket

We can inspect the container and check if the bucket has been mounted

```json
"Mounts": [
            {
                "Type": "volume",
                "Name": "maps-openmaps-schools",
                "Source": "",
                "Destination": "/data",
                "Driver": "rexray/s3fs:latest",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
```

We can also inspect the volume

```json
$ docker volume inspect maps-openmaps-schools
[
    {
        "CreatedAt": "0001-01-01T00:00:00Z",
        "Driver": "rexray/s3fs:latest",
        "Labels": null,
        "Mountpoint": "",
        "Name": "maps-openmaps-schools",
        "Options": null,
        "Scope": "global",
        "Status": {
            "availabilityZone": "",
            "fields": null,
            "iops": 0,
            "name": "maps-openmaps-schools",
            "server": "s3fs",
            "service": "s3fs",
            "size": 0,
            "type": ""
        }
    }
]
```
