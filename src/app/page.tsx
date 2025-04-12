"use client";
import React from "react";
import "./globals.css";
import { Editor, Element, Frame } from "@craftjs/core";
import { Text } from "@/components/Demo/Text";
import { Button } from "@/components/Demo/Button";
import { Container } from "@/components/Demo/Container/ContainerComponent";
import { Heading } from "@/components/Demo/Heading/HeadingComponent";
import { ViewPort } from "@/components/ViewPort";

export default function Home() {
  return (
    <div className="h-screen oklch(0.145 0 0)">
      <Editor resolver={{ Button, Container, Text , Heading }} enabled={true}>
        <ViewPort>
          <Frame>
            <Element canvas is="div" id="Base Container">
              <Text content="hii" />
            </Element>
          </Frame>
        </ViewPort>
      </Editor>
    </div>
  );
}
