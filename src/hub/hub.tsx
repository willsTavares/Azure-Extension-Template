import "./hub.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SDK from "azure-devops-extension-sdk";
import { CommonServiceIds, IProjectPageService } from "azure-devops-extension-api";


import { VssPersona } from "azure-devops-ui/VssPersona";
import { Page } from "azure-devops-ui/Page";
import { Card } from "azure-devops-ui/Card";

export interface IUserState {
  userName?: string;
  projectName?: string;
  imageUrl?: string;
}

class Hub extends React.Component<{}, IUserState> {
  constructor(props: {}) {
    super(props);

    this.state = {

    }
}

public componentDidMount() {
  SDK.init();  
  this.initializeState();

}

private async initializeState(): Promise<void> {
    await SDK.ready();
    
    const userName = SDK.getUser().displayName;
    this.setState({
        userName
     });

     const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();
        if (project) {
            this.setState({ projectName: project.name });
        }
      
      const imageUrl = SDK.getUser().imageUrl;
      this.setState({
        imageUrl
      })
}
  public render(): JSX.Element {

    const { userName, projectName, imageUrl} = this.state;

    return (
      <Page className="flex-grow flex-self-center">
         <div className="page-content page-content-top" >
        <Card >
          <div>
                <div className="center">
                    <VssPersona
                           imageUrl={imageUrl}
                           size={"extra-large"}
                           />      
                </div>
                <div >
                          <h2>Hello, {userName}</h2>
                           <p className="center">Welcome to the {projectName}</p>
                </div>
            </div>
        </Card>
        </div>
      </Page>
    );
  } 
}

ReactDOM.render(<Hub />, document.getElementById("root"));
