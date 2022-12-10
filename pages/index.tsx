import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import openaiapi from 'openai-api';
import { useState } from 'react';
require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.KEY,
});

const openai = new OpenAIApi(configuration);

const Home: NextPage = () => {
  const[coverLetter, setCoverLetter] = useState('Cover letter is generated here');
  const[resume, setResume] = useState('');
  const[jobDescription, setJobDescription] = useState('');

  const generateCoverLetter = async () => {
    console.log("Generating cover letter")
    const gptResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Write a convincing 100-word cover letter for the following job ${jobDescription}. Please use informatio from my resume: ${resume}`,
      max_tokens: 1000
    });

  console.log(gptResponse.data.choices[0].text)
  setCoverLetter(gptResponse.data.choices[0].text);
}
return (
  <div>
    <p>{coverLetter}</p>
    <textarea onChange={(e) => setResume(e.target.value)}></textarea>
    <textarea onChange={(e) => setJobDescription(e.target.value)}></textarea>
    <button onClick={generateCoverLetter}>Generate Cover Letter</button>
  </div>
  );

};

export default Home;
