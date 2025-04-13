"use client";
import React from "react";
import "./globals.css";
import { Editor, Element, Frame } from "@craftjs/core";
import { Text } from "@/components/Demo/Text";
import { Button } from "@/components/Demo/Button";
import { Container } from "@/components/Demo/Container/ContainerComponent";
import { Heading } from "@/components/Demo/Heading/HeadingComponent";
import { ViewPort } from "@/components/ViewPort";
import Recursive from "@/components/Demo/Recursive";
import { useEffect,useState } from "react";


export default function Home() {
  const [json, setJson] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('https://67f7183e42d6c71cca6403bd.mockapi.io/v1/api/pages/1');
        const result = await res.json();

        if (result?.pageContent) {
          const decoded = atob(result.pageContent); // decode base64
          setJson(decoded); // set JSON string (craft.js internal state)
          console.log("Loaded JSON:", decoded);
        } else {
          console.warn("No pageContent found in API response");
        }
      } catch (err) {
        console.error("Error loading editor content:", err);
      }
    };

    loadData();
  }, []);
  
  return (
    <div className="h-screen oklch(0.145 0 0)">
      <Editor resolver={{ Button, Container, Text , Heading }} enabled={true}>
      <ViewPort>
          {json ? (
            <Frame json={json} />
          ) : (
            <Frame>
              <Element canvas is="div" id="Base Container">
                <Text content="hii" />
              </Element>
            </Frame>
          )}
        </ViewPort>
      </Editor>
    </div>
  );
}
