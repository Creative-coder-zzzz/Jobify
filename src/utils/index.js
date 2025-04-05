import qs from "query-string";

export const recruiterOnboardFormControls = [
    {
        label: 'Name',
        name: 'name',
        placeholder: 'Enter your name',
        componentType: 'input'
    },
    {
        label: 'Company Name',
        name: 'companyName',
        placeholder: 'Enter your company name',
        componentType: 'input'
    },
    {
        label: 'Company Role',
        name: 'companyRole',
        placeholder: 'Enter your company Role',
        componentType: 'input'
    },
]

export const initialRecruiterFormData = {
    name: '',
    companyName: '',
    companyRole: '',
}

export const candidateOnboardFormControls = [
    {
        label: "Resume",
        name: 'resume',
        componentType: "file"
    },
    {
        label: 'Name',
        name: 'name',
        placeholder: 'Enter your name',
        componentType: 'input'
    },{
        label: 'Current Company',
        name: 'currentCompany',
        placeholder: 'Enter your current company',
        componentType: 'input' 
    },
    {
        label: 'Current Job Location',
        name: 'currentJobLocation',
        placeholder: 'Enter your current job location',
        componentType: 'input' 
    }, 
    {
        label: 'Preffered job location',
        name: 'PrefferedJobLocation',
        placeholder: 'Enter your preffered job location',
        componentType: 'input' 
    },  
     {
        label: 'Current Salary',
        name: 'currentSalary',
        placeholder: 'Enter your current Salary',
        componentType: 'input' 
    },
    {
        label: 'Notice Period',
        name: 'noticePeriod',
        placeholder: 'Enter your Notice Period',
        componentType: 'input' 
    },
    {
        label: 'Skills',
        name: 'skills',
        placeholder: 'Enter your Skills',
        componentType: 'input' 
    },
    {
        label: 'Previous Company',
        name: 'previousCompanies',
        placeholder: 'Enter your previous company ',
        componentType: 'input' 
    },
    {
        label: 'Total Experience',
        name: 'totalExperience',
        placeholder: 'Enter your total experience',
        componentType: 'input' 
    },

    {
        label: 'College',
        name: 'college',
        placeholder: 'Enter your College Name',
        componentType: 'input' 
    },
    {
        label: 'College Location',
        name: 'collegeLocation',
        placeholder: 'Enter your College Location',
        componentType: 'input' 
    },
    {
        label: 'Graduated Year',
        name: 'graduateYear',
        placeholder: 'Enter your Graduation Year',
        componentType: 'input' 
    },
    {
        label: 'GitHub Profile',
        name: 'githubProfile',
        placeholder: 'Enter your Github Profile',
        componentType: 'input' 
    },
    {
        label: 'Linked in Profile',
        name: 'linkedinProfile',
        placeholder: 'Enter your Linked in Profile',
        componentType: 'input' 
    },
]
 
export const initialCandidateFormData = {

    name: '',
    currentJobLocation: '',
    PrefferedJobLocation: '',
    currentSalary: "",
    noticePeriod: "",
    skills: '',
    currentCompany: '',
    previousCompanies: '',
    totalExperience: '',
    graduateYear:'',
    college: '',
    collegeLocation: '',
    githubProfile: '',
    linkedinProfile: '',
  
}

export const initialCandidateAccountFormData = {
    resume: "",
    name: '',
    currentJobLocation: '',
    PrefferedJobLocation: '',
    currentSalary: "",
    noticePeriod: "",
    skills: '',
    currentCompany: '',
    previousCompanies: '',
    totalExperience: '',
    graduateYear:'',
    college: '',
    collegeLocation: '',
    githubProfile: '',
    linkedinProfile: '',
  
}

export const postNewJobFormControls = [
    {
        label: 'Company Name',
        name: "companyName",
        placeholder: "Enter company Name",
        componentType: "input",
        disabled: true
    },
    {
        label: 'Title',
        name: "title",
        placeholder: "Enter Job Title",
        componentType: "input"
    },
    {
        label: 'Type',
        name: "type",
        placeholder: "Enter Job Type",
        componentType: "input"
    },
    {
        label: 'Location',
        name: "location",
        placeholder: "Job Location",
        componentType: "input"
    },
    {
        label: 'Experience',
        name: "experience",
        placeholder: "Experience",
        componentType: "input"
    },
    {
        label: 'Description',
        name: "description",
        placeholder: "Enter Job Description",
        componentType: "input"
    },
    {
        label: 'Skills',
        name: "skills",
        placeholder: "Enter Skills",
        componentType: "input"
    },
]

export const initialPostNewJobFormData = {
    companyName: '',
    title: '',
    type: '',
    location: '',
    experience: '',
    description: '',
    skills: ''
}

 export const filterMenuDataArray = [
    {
        id: "companyName",
        label: 'Company Name'
    },
    {
        id: "title",
        label: 'Title'
    },
    {
        id: "type",
        label: 'Type'
    },
    {
        id: "location",
        label: 'Location'
    },
 ]

 export function formUrlQuery({ params, dataToAdd }) {

    let currentURL = qs.parse(params);
  
    if (Object.keys(dataToAdd).length > 0) {
      Object.keys(dataToAdd).map((key) => {
        if (dataToAdd[key].length === 0) delete currentURL[key];
        else currentURL[key] = dataToAdd[key].join(",");
      });
    }
  
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentURL,
      },
      {
        skipNull: true,
      }
    );
  }


  export const membershipPlans = [
    {
      heading: "Tier 1",
      price: 100,
      type: "basic",
    },
    {
      heading: "Tier 2",
      price: 1000,
      type: "teams",
    },
    {
      heading: "Tier 3",
      price: 5000,
      type: "enterprise",
    },
  ];