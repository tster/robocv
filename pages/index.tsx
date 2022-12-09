import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import openaiapi from 'openai-api';
import { useState } from 'react';

const OPENAI_API_KEY = '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';

const OpenAI = require('openai-api');

const openai = new OpenAI(OPENAI_API_KEY);


const Home: NextPage = () => {
  const[coverLetter, setCoverLetter] = useState('');
  const[resume, setResume] = useState('');
  const[jobDescription, setJobDescription] = useState('');

  const generateCoverLetter = async () => {
    const gptResponse = await openai.complete({
      engine: 'davinci',
      prompt: `${resume}\n\n${jobDescription}`,
      maxTokens: 100,
      temperature: 0.9,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false
    });
    setCoverLetter(gptResponse.choices[0].text);
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
