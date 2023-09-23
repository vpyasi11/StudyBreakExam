## StudyBreakAcademyExam
#Single Question API

Sample Data :
 {
      "type": "single",
      "question": "Question_6",
      "questionImage": "Question_Image_2 ",
      "hasOptions": true,
      "availableOptions":"[{Option_1: 1 ,Value:Correct},{Option_2: 2 ,Value:Incorrect},{Option_3: 3,Value:Incorrect},{Option_4: 4   ,Value:Incorrect}]",
      "correctTextAnswer": "Option_1",
      "solution": "Solution_2",
      "solutionImage": "Solution_Image_3",
      "topic": "Topic_2",
      "subTopic": "SubTopic_2",
      "difficultyLevel": "Hard",
      "markingScheme" :"[{Type:Correct, score:4},{Type:Incorrect, score:-2}]"
    }



```bash
PORT=3500
MONGO_URI="mongodb://localhost:27017/StudyBreak"
JWT_TOKEN="json@token"
```
### 
```
List of User routes (with sample data) :
```

> Chandramani

1. POST http://localhost:3500/auth/v1/login (LOGIN)

    {<br>
    "email":"chandan@gmail.com",<br>
    "password":"chandan123@secure" <br/>
    }

2. POST http://localhost:3500/auth/v1/resetPassword (forgot password)

    {<br>
    "email":"chandan@gmail.com",<br>
    "newPassword":"chandan123"<br>
    }

3. GET http://localhost:3500/auth/v1/byname/:name (user by name)

4. GET http://localhost:3500/auth/v1/byrole/:role (user by role)

> Chandan

1. POST http://localhost:3500/auth/v1/register (user registration)

    {<br>
    "username": "Snehal",<br>
    "password":"Snehal@123",<br>
    "email":"Snehal@gmail.com",<br>
    "role":"admin"<br>
    }

2. GET http://localhost:3500/auth/v1/ (get all users)

3. DELETE http://localhost:3500/auth/v1/:id (delete user by id)

4. GET http://localhost:3500/auth/v1/:id (get user by id)

```
POST http://localhost:3500/auth/v1/resetMail/:id (reset email using id) created together
```



