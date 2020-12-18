import React from 'react';
import { JobStatus } from './Job';

/*
class JobPipeline extends Component<any> {

    private childRefs: React.Ref<HTMLInputElement>[] = [];

    render(): ReactNode {
        if(this.props.children 
            && Array.isArray(this.props.children) 
            && (this.props.children.length > 0)
        ) {
        return this.props.children.map((child) => {
            let childRef = React.createRef<HTMLInputElement>();
            this.childRefs.push(childRef);
            return React.cloneElement(child , { ref: childRef });
          });
    }

}
*/

export type JobPipelineProperties = {
    children?: any
}

const JobPipeline = (props: JobPipelineProperties) => {
    const callbacks: any[] = [];
    const startNextJob = (index: number) => {
        if(index + 1 < callbacks.length)
        callbacks[index + 1](JobStatus.Started);
    }

    const setCallback = (index: number, callback: any) => {
        callbacks[index] = callback;
        if(index === 0) {
            callback(JobStatus.Started);
        }
    }

    return props.children.map((child: any, index: number) => {

        return React.cloneElement(child, 
            { 
                childIndex: index,
                onComplete: startNextJob,
                onInit: setCallback
            });
    });
};

export default JobPipeline;