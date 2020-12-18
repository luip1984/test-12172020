import React from 'react';
import JobPipeline from './JobPipeline';
import { Job } from './Job';
import './App.css';

function App() {
    //onComplete={ (jobId: string) => updatePipeline(jobId)}
    return (
        <JobPipeline>
            <Job jobId='123' timeToComplete={3}/>
            <Job jobId='234' timeToComplete={2}/>
            <Job jobId='345' timeToComplete={1}/>
            <Job jobId='456' timeToComplete={2}/>
            <Job jobId='567' timeToComplete={5}/>
        </JobPipeline>
    );
}

export default App;
