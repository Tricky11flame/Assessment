"use client";
import React from "react";
import "./globals.css";
import { Editor, Element, Frame, useEditor } from "@craftjs/core";
import { Text } from "@/components/Demo/Text";
import { Button } from "@/components/Demo/Button";
import { Container } from "@/components/Demo/Container/ContainerComponent";
import { Heading } from "@/components/Demo/Heading/HeadingComponent";
import { ViewPort } from "@/components/ViewPort";
import { useEffect,useState } from "react";
import lz from "lzutf8";

export default function Home() {
  return (
    <div className="h-screen oklch(0.145 0 0)">
      <Editor resolver={{ Button, Container, Text , Heading }} enabled={true}>
      <ViewPort>
        <EditorContentLoader />
        </ViewPort>
      </Editor>
    </div>
  );
}

function EditorContentLoader() {
  const { actions } = useEditor();
  const [json, setJson] = useState<string | null>(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        const id = localStorage.getItem("PageId");
        if (!id) return;
        const res = await fetch(`https://67f7183e42d6c71cca6403bd.mockapi.io/v1/api/pages/${id}`);
        const data = await res.json();
        const json2 = lz.decompress(lz.decodeBase64(data.data));
        setJson(json2);
      } catch (err) {
        console.error("Error loading editor content:", err);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (json) {
      actions.deserialize(json);
    }
  }, [json, actions]);

  return json ? (
    <Frame json={json}>
      <Element canvas is="div" id="Base Container">
      </Element>
    </Frame>
  ) : (
    <Frame>
      <Element canvas is="div" id="Base Container">
        <Text content="hii" />
      </Element>
    </Frame>
  );
}