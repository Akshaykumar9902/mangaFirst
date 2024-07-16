"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function PageBody() {
  const [content, setContent] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data = await await axios.get("/api/users/crawlwebsite");
  //       console.log("akshay", data, data.data.data);
  //       setContent(data.data.data);
  //       //   setLinks(data.data.links);
  //     };

  //     fetchData();
  //   }, []);

  useEffect(() => {
    if (iframeRef.current) {
      // const h1 = iframeRef.current.contentWindow?.document.querySelector('a');
      // Rest of the code
      const data = window.frames;
      let demo1 = document.getElementById("demo1");
    //  demo1?.innerHTML = data?.innerHTML;
      console.log("akshayh", data, demo1);
    }
  }, [iframeRef.current]);

  // function handleIframe() {
  //     setLoading(false);
  //     const iframeItem = iframeRef.current;
  //     const anchors = iframeItem?.contentWindow?.document.getElementsByTagName("a");
  //     console.log('akshaya', anchors)
  //   }
  return (
    <div>
      {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
      {/* {links.map((link, index) => (
                <a key={index} href={link}>{link}</a>
            ))} */}
      {/* {content.length && content?.map((link, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: link }}/>
      ))} */}
    
      <iframe
        ref={iframeRef}
        id="id_description_iframe"
        src="https://manhuafast.net/"
        height={"115%"}
        width={"100%"}
        style={{ position: "absolute", top: "-100px", zIndex: "-1", visibility:"hidden" }}
      />
      <div id="demo1"></div>
    </div>
  );
}
