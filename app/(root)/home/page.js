'use client';

import Image from "next/image";
import React , { useState } from "react";
import InputArea from "../../../components/InputArea";
import FileUpload from "../../../components/FileUpload";
import Predict from "../../../components/Predict";

export default function Home() {
  const [message , setMessage] = useState('');
  return (
    <div>
      <InputArea message={message} setMessage={setMessage}/>
      <FileUpload message={message} setMessage={setMessage}/>
      <Predict message={message} />
    </div>
  );
}
