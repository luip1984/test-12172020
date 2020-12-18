import React, { useState } from 'react';
import CountdownService from './CountdownService';

export enum JobStatus {
    NotStarted,
    Started,
    Finished
}

interface JobProperties {
    jobId: string,
    timeToComplete: number,
    onInit?: any,
    onComplete?: any,
    childIndex?: number
}

export const Job = (props: JobProperties) => {
    const [jobStatus, setJobStatus] = useState(JobStatus.NotStarted);
    const [timeRemaining, setTimeRemaining] = React.useState(props.timeToComplete);

    React.useEffect(() => {
        if(jobStatus !== JobStatus.NotStarted) {
            (async () => {
                await CountdownService(timeRemaining, setTimeRemaining);
                jobComplete(props.jobId);
            })();    
        }
    }, [jobStatus, props.jobId, timeRemaining]);

    React.useEffect(() => {
        if(props.onInit) {
            props.onInit(props.childIndex, setJobStatus);
        }
    }, [props, props.onInit]);

    const jobComplete = (jobId: string) => {
        setJobStatus(JobStatus.Finished);
        if (props.onComplete) {
            props.onComplete(props.childIndex);
        }
    };

    if(jobStatus === JobStatus.NotStarted) {
        return <div/>;
    } else {
        return (
            <div>
                Job ID {props.jobId}:{' '}
                {timeRemaining <= 0 ? 'Done!' : `${timeRemaining}s...`}
            </div>
        );
    }
}
