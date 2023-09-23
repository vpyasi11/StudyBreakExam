## Test Formation, Section and Question Schema and JSON request details
> ### Test 1 - name, instrutions and all question
* Section 1 - id, name,
* Section 2
* Section 3
* Section 4

> ### Test 2 - name, instrutions and all question
* Section 1 - id, name,
* Section 2
* Section 3

> ### Test 3 - name, instrutions and all question
* Section 1 - id, name,
* Section 2

## Front end visualization
* Test formation - section array = ref id
* Name
* Instrutions
* Number of section - 4 (+) - array
* Section data
  * Section name
  * Section  type
  * Number of question
  * Question (array of id reference)
  * Section duration timing
  * Section cut off : object
  * Calculator boolean
  * Section end provision
* Total duration of all section <br/>
* Submit button <br/>

### Dependencies Installed
```
npm i mongoose
npm i express
npm i dotenv
npm i axios
npm i morgon
npm i multer
npm i nodemon
npm i cors
npm i bcrypt
```
### Model for Test formation (testFormation.model.js)
---
```
const testFormationSchema = new mongoose.Schema(
  {
    testName: {
      type: String,
      require: [true, "Please provide a section name"],
    },
    instructions: {
      type: String,
      require: [true, "Please provide a section type"],
    },
    numberOfSections: {
      type: Number,
      required: [true, "Please provide number of questions"],
    },
    sectionData: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sections",
      },
    ],
    totalDuration: {
      type: Number,
      required: [true, "Please provide section duration"],
    },
  },
  { timestamps: true }
);

const testFormationModel = mongoose.model("testFormation", testFormationSchema);
module.exports = testFormationModel;
```
### Model for Section (section.model.js)
---
```
const sectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      require: [true, "Please provide a section name"],
    },
    sectionType: {
      type: String,
      require: [true, "Please provide a section type"],
    },
    numberOfQuestions: {
      type: Number,
      required: [true, "Please provide number of questions"],
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
      },
    ],
    sectionDuration: {
      type: Number,
      required: [true, "Please provide section duration"],
    },
    sectionCutOff: [
      {
        gen: {
          type: Number,
          required: [true, "Please provide General category score"],
        },
        obc: {
          type: Number,
          required: [true, "Please provide OBC category score"],
        },
        sc: {
          type: Number,
          required: [true, "Please provide SC category score"],
        },
        st: {
          type: Number,
          required: [true, "Please provide ST category score"],
        },
      },
    ],
    calculatorRequired: {
      type: Boolean,
      default: false,
    },
    sectionEndProvision: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const sectionModel = mongoose.model("section", sectionSchema);
module.exports = sectionModel;
```
### Model for Question (question.model.js)
---
```
const Schema = mongoose.Schema;
const questionSchema = new Schema(
  {
    // select the type of question (setBased, single or Essay)
    type: {
      type: String,
      required: true,
    },
    //question type - text/equation/image editor - these will have only 3 values passed from FE and we will store this directly
    question: {
      type: String,
      required: true,
    },
    questionImage: {
      type: String,
      required: false,
    },
    //options available? - will have only true or false value, if false we will have text else radio button
    hasOptions: {
      type: Boolean,
      required: true,
    },
    //if has_options is true, we will take 4/or more(based on requirement) options from admin user
    //expected UI - a text bar with a single radio button next to it, if selected pass true with the option in an object
    //sample input from FE {value: "", option: true}, user will only select true for correct option
    availableOptions: {
      type: Array,
      required: false,
    },
    //correct option - will strore the correct answer as text(if user has option we will recieve the correct answer as value(string))
    correctTextAnswer: {
      type: String,
      required: false,
    },
    //Subquestion - only used for set based question
    subQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
        required: false,
      },
    ],
    solution: {
      type: String,
      required: false,
    },
    solutionImage: {
      type: String,
      required: false,
    },
    topic: {
      type: String,
      required: true,
    },
    subTopic: {
      type: String,
      required: true,
    },
    difficultyLevel: {
      type: String,
      required: true,
    },
    //sample input from FE {type:"correct", score:"3"}, user will only select true for correct option
    markingScheme: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const questionModel = mongoose.model(
  "question",
  questionSchema
);

module.exports = questionModel;
```
### APIs - Section
* get
* post
* update 
* delete
### Tasks Allocation
1. **Shailesh - question, testFormation and section (post API)**
   * /addtestformations - API to add new test formations to the mongo database
   * updateQuestionsByID - API to update the questions by ID
2. **Karthik - question, testFormation and section (update API)**
   * /updatetestformation/:id - (API to update test formations by ID)
   * /addquestions - (API to add all the questions with different types - single, set, essay)
3. **Sanpreet - testFormation and section (get API)**
   * /gettestformation/:id - (API to get the test formations based on ID)
   * /getalltestformation - (API to get all the test formations)
4. **Sagar - testFormation and section (delete API)**

### JSON Request format
#### Adding Questions to the Mongo database
```
POST: http://localhost:3000/question/addquestions

{
  "type": "set",
  "question": "Question-4",
  "questionImage": "Question_Image_1",
  "hasOptions": true,
  "availableOptions": "[{Option_1: 1 ,Value:Incorrect},{Option_2: 2 ,Value:correct},{Option_3: 3,Value:Incorrect},{Option_4: 4 ,Value:Incorrect}]",
  "correctTextAnswer": "Option_1",
  "subQuestions":[{
        "type": "set",
        "question": "Sub Question-1",
        "questionImage": "Question_Image_1",
        "hasOptions": true,
        "availableOptions": "[{Option_1: 1 ,Value:Incorrect},{Option_2: 2 ,Value:correct},{Option_3: 3,Value:Incorrect},{Option_4: 4 ,Value:Incorrect}]",
        "correctTextAnswer": "Option_1",
        "solution": "Solution-1",
        "solutionImage": "Solution_Image_1",
        "topic": "Topic_2",
        "subTopic": "SubTopic_2",
        "difficultyLevel": "Hard",
        "markingScheme": "[{Type:Correct, score:4},{Type:Incorrect, score:-2}]"
    },
    {
        "type": "set",
        "question": "Sub Question-2",
        "questionImage": "Question_Image_1",
        "hasOptions": true,
        "availableOptions": "[{Option_1: 1 ,Value:Incorrect},{Option_2: 2 ,Value:correct},{Option_3: 3,Value:Incorrect},{Option_4: 4 ,Value:Incorrect}]",
        "correctTextAnswer": "Option_1",
        "solution": "Solution-1",
        "solutionImage": "Solution_Image_1",
        "topic": "Topic_2",
        "subTopic": "SubTopic_2",
        "difficultyLevel": "Hard",
        "markingScheme": "[{Type:Correct, score:4},{Type:Incorrect, score:-2}]"
    },
    {
        "type": "set",
        "question": "Sub Question-2",
        "questionImage": "Question_Image_1",
        "hasOptions": true,
        "availableOptions": "[{Option_1: 1 ,Value:Incorrect},{Option_2: 2 ,Value:correct},{Option_3: 3,Value:Incorrect},{Option_4: 4 ,Value:Incorrect}]",
        "correctTextAnswer": "Option_1",
        "solution": "Solution-1",
        "solutionImage": "Solution_Image_1",
        "topic": "Topic_2",
        "subTopic": "SubTopic_2",
        "difficultyLevel": "Hard",
        "markingScheme": "[{Type:Correct, score:4},{Type:Incorrect, score:-2}]"
    }],
  "solution": "Solution-1",
  "solutionImage": "Solution_Image_1",
  "topic": "Topic_2",
  "subTopic": "SubTopic_2",
  "difficultyLevel": "Hard",
  "markingScheme": "[{Type:Correct, score:4},{Type:Incorrect, score:-2}]"
}
```
#### Adding Test Formation and Sections to the Mongo Database
```
POST: http://localhost:3000/test/addtestformations

{
  "testName":"HeroVired3",
  "instructions":"Welcome to FSD Batch8 GAP Test",
  "numberOfSections":2,
  "totalDuration":90,
  "sectionData":[{
    "sectionName":"Section-1",
    "sectionType":"esssay",
    "numberOfQuestions":10,
    "questions":[],
    "sectionDuration":60,
    "sectionCutOff":[{
      "gen": 60,
      "obc": 40,
      "sc": 30,
      "st": 27
    }],
    "calculatorRequired":"false",
    "sectionEndProvision":"true"
  },
  {
    "sectionName":"Section-2",
    "sectionType":"esssay",
    "numberOfQuestions":5,
    "questions":[],
    "sectionDuration":15,
    "sectionCutOff":[{
      "gen": 60,
      "obc": 40,
      "sc": 30,
      "st": 27
    }],
    "calculatorRequired":"false",
    "sectionEndProvision":"true"
  }]
}
```

#### Update the Test Formation by ID in the Mongo database
```
PATCH: http://localhost:3000/test/updatetestformation/:id
(we need to pick the object id (_id) from the database for the particular test formation)

{
  "testName":"HeroVired3",
  "instructions":"Welcome to FSD Batch8 GAP Test",
  "numberOfSections":2,
  "totalDuration":90,
  "sectionData":[{
    "sectionName":"Section-1",
    "sectionType":"esssay",
    "numberOfQuestions":10,
    "questions":[],
    "sectionDuration":60,
    "sectionCutOff":[{
      "gen": 60,
      "obc": 40,
      "sc": 30,
      "st": 27
    }],
    "calculatorRequired":"false",
    "sectionEndProvision":"true"
  },
  {
    "sectionName":"Section-2",
    "sectionType":"esssay",
    "numberOfQuestions":5,
    "questions":[],
    "sectionDuration":15,
    "sectionCutOff":[{
      "gen": 60,
      "obc": 40,
      "sc": 30,
      "st": 27
    }],
    "calculatorRequired":"false",
    "sectionEndProvision":"true"
  }]
}
```
#### Get Test Formations by ID from the mongo database
```
GET: http://localhost:3000/test/gettestformation/:id
(we need to pick the object id (_id) from the database for the particular test formation)
```
#### Get Test Formations by ID from the mongo database
```
GET: http://localhost:3000/test/getalltestformation
```

