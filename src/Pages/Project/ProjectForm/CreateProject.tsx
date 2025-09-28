import { useState } from 'react';
import Stepper, { Step } from '../../../components/common/Project/CreateProject/Stepper';
import ProjectBasicInformation from './ProjectBasicInformation';

function CreateProjectForm() {
  const [name, setName] = useState("");
  
  return(
    <div className="h-screen w-full flex flex-col">
      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          console.log(step);
        }}
        onFinalStepCompleted={() => console.log("All steps completed!")}
        backButtonText="Previous"
        nextButtonText="Next"
        className="flex-1 w-full flex flex-col"
        stepCircleContainerClassName="w-full px-4 py-4 bg-white"
        contentClassName="flex-1 flex flex-col p-4 overflow-auto"
        stepContainerClassName="flex-0"
        footerClassName="flex-0"
      >
        <Step>
          <ProjectBasicInformation/>
        </Step>
        <Step>
          <h2>Step 2</h2>
          <img style={{ height: '100px', width: '100%', objectFit: 'cover', objectPosition: 'center -70px', borderRadius: '15px', marginTop: '1em' }} src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894" />
          <p><ProjectBasicInformation/></p>
        </Step>
        <Step>
          <h2>How about an input?</h2>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" />
        </Step>
        <Step>
          <h2>Final Step</h2>
          <p>You made it!</p>
        </Step>
      </Stepper>
    </div>
  );
}

export default CreateProjectForm;