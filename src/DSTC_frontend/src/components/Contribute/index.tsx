import React, { forwardRef, useEffect, useState } from "react";

import TextareaAutosize from "react-textarea-autosize";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { Alert } from "@mui/material";
import WriteNavbar from "./Nav";
import { useNavigate, useParams } from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";
import {
  DSTC_backend,
  createActor,
} from "../../../../declarations/DSTC_backend";
import { HttpAgent } from "@dfinity/agent";

const INITIAL_POST_DATA = { title: "", markdown: "", tags: "" };

export default function Write() {
  const [showAlert, setShowAlert] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  let actor = DSTC_backend;
  const agent: any = new HttpAgent();

  http: actor = createActor("kc5xa-pqaaa-aaaap-qhk3a-cai", {
    agent,
  });
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handlePublishStory = async () => {
    setShowAlert(true);
    setDisabled(true);
    let story_no_lines = story;
    let words = `written by  ${localStorage.getItem(
      "principal"
    )}  ${story_no_lines}`;

    let res: any = await actor.publish_dust(words, title);

    if (res?.Ok) {
      setDisabled(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setDisabled(false);
      setSuccess(false);
      setFailure(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  const [post, setPost] = useState(INITIAL_POST_DATA);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const [hasPostId, setHasPostId] = useState(false);

  useEffect(() => {
    if (postId) setHasPostId(true);
    return () => setHasPostId(false);
  }, [postId]);

  useEffect(() => {
    document.title = "New DUST";
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        background: "radial-gradient(circle at top right, #1a1b2b, #3a375e)",
      }}
    >
      {showAlert && success ? (
        <Alert severity="success">Article published</Alert>
      ) : null}
      {showAlert && failure ? (
        <Alert severity="error">Error publishing</Alert>
      ) : null}

      <WriteNavbar
        publish={handlePublishStory}
        buttonText={hasPostId ? "Save" : "Publish"}
        onClick={handleClickOpen}
        disabled={disabled}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
          margin: "auto",
          marginTop: "3vh",
          gap: "22px",
        }}
      >
        <TextareaAutosize
          autoFocus
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          placeholder="Title"
          style={{
            width: "100%",
            fontSize: "45px",
            border: "none",
            outline: "transparent",
            color: "black",
            resize: "none",
            padding: "10px",
          }}
        />
        <TextareaAutosize
          onChange={(e) => {
            setDisabled(false);
            setStory(e.target.value);
          }}
          value={story}
          className="hide_scroll text-black"
          placeholder="Write an article"
          style={{
            width: "100%",
            fontSize: "20px",
            border: "none",
            outline: "transparent",
            resize: "none",
            padding: "10px",
          }}
        />
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <DialogComponent
            handleClose={handleClose}
            title={post.title}
            markdown={post.markdown}
            handleTags={(val) => setPost({ ...post, tags: val })}
            handlePublish={handlePublishStory}
            tags={post.tags}
            buttonText={hasPostId ? "Save now" : "now"}
          />
        </Dialog>
      </div>
    </div>
  );
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent = ({
  handleClose,
  title,
  markdown,
  handleTags,
  handlePublish,
  tags: tagsGiven,
  buttonText,
}: {
  handleClose(): void;
  title: string;
  markdown: string;
  handleTags(val: string): void;
  handlePublish(): void;
  tags: string;
  buttonText: string;
}) => {
  const [tags, setTags] = useState(tagsGiven);

  const test = markdown ?? "";
  const codeRegex = /<code>(.*?)<\/code>/g;
  const withoutCode = markdown.replace(codeRegex, "");
  const imgRegex = /<img.*?src=['"](.*?)['"]/;
  const image = imgRegex.exec(test)?.at(1) || "";
  const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
  const summary = withoutCode.replace(htmlRegexG, "");

  return (
    <div
      className="dialog_main"
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "90vh",
        alignItems: "center",
      }}
    >
      <div
        className="wrapper_write_dialog"
        style={{
          width: "900px",
          height: "350px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          className="left_write_dialog"
          style={{ width: "47%", display: "flex", flexDirection: "column" }}
        >
          <h4
            style={{
              marginTop: "0px",
              marginBottom: "22px",
              color: "rgb(61 61 61)",
            }}
          >
            Story Preview
          </h4>
          <div
            className="image_preview"
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: "#fafafa",
              color: "rgb(153 153 153)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {image ? (
              <img
                src={image}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt="img"
              />
            ) : (
              <p style={{ width: "70%", fontSize: "14px", lineHeight: "22px" }}>
                Include a high-quality image in your story to make it more
                inviting to readers.
              </p>
            )}
          </div>
          <h4
            style={{
              marginTop: "15px",
              marginBottom: "4px",
              borderBottom: "2px solid #c1bdbd",
              color: "rgb(61 61 61)",
              paddingBottom: "5px",
            }}
          >
            {title}
          </h4>
          <p
            style={{
              borderBottom: "2px solid #c1bdbd",
              color: "rgb(153 153 153)",
              paddingBottom: "15px",
              marginTop: "5px",
            }}
          >
            {summary.length > 112 ? summary.slice(0, 112) + " ..." : summary}
          </p>
        </div>
        <div
          className="right_write_dialog"
          style={{
            width: "47%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <span
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "-150px",
              right: "-34px",
              cursor: "pointer",
            }}
          >
            ✕
          </span>
          <p
            style={{
              fontWeight: "bold",
              color: "rgb(113 112 112)",
              fontSize: "15.8px",
              marginBottom: "18px",
            }}
          >
            Publishing to{" "}
            <span style={{ color: "rgb(61 61 61)" }}>Your Name</span>
          </p>
          <p style={{ margin: "12px 0", color: "gray" }}>
            Add or change topics (up to 5) so readers know what your story is
            about
          </p>
          <input
            value={tags}
            onChange={(e) => {
              setTags(e.target.value);
              handleTags(e.target.value);
            }}
            style={{
              margin: "10px 0",
              height: "45px",
              border: "2px solid #eeecec",
              backgroundColor: "#fafafa",
              padding: "4px 8px",
              outline: "transparent",
            }}
            type="text"
            placeholder="Add topics followed by commas e.g., Java, TypeScript"
          />
          <button
            onClick={() => {
              alert("hey");
              handlePublish();
            }}
            style={{
              marginTop: "18px",
              color: "white",
              backgroundColor: tags.length > 0 ? "#1a8917" : "#cbe4ca",
              border: "none",
              outline: "transparent",
              width: "fit-content",
              padding: "10px 12px",
              borderRadius: "17px",
              cursor: "pointer",
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
