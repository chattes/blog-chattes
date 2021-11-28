import { SocialIcon } from "react-social-icons";

export default function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <p className="Lead">
            Hello, I am <b>Sourav Chatterjee</b>. I am a full stack developer
            based out of <b>Toronto</b> and have been programming for more than
            15 years.
          </p>
          <p>
            Curently I program primarily using{" "}
            <a href="https://nodejs.org/en/" target="_blank">
              NodeJS
            </a>{" "}
            and{" "}
            <a href="https://reactjs.org/" target="_blank">
              React
            </a>
            . They are my goto stack when I try to experiment and build
            something new.
          </p>
          <p>
            I have also programmed in{" "}
            <a href="https://go.dev/" target="_blank">
              golang
            </a>{" "}
            and tried a little bit of{" "}
            <a href="https://elixir-lang.org/" target="_blank">
              Elixir
            </a>{" "}
            in the past.
          </p>
          <p>
            I try to write about the things I learn/experiment in my day-to-day
            work in this blog, as a record and for retention.
          </p>
          <hr />
        </div>
        <div className="col-sm-6 offset-sm-3">
          <p className="d-inline-flex align-items-center justify-content-center w-100">
            You can find me here
          </p>
          <div className="d-flex align-items-center justify-content-center">
            <div className="p-2">
              <SocialIcon url="https://www.linkedin.com/in/sourav-chatterjee-ab93962a/" />
            </div>
            <div className="p-2">
              <SocialIcon url="https://github.com/chattes?tab=repositories" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
