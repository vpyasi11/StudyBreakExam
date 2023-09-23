import React from "react";

const StudentTestNav = () => {
  const [studentTest, setStudentTest] = useState();

  useEffect(() => {
    const testID = "64c6577c7964aa3933465480";
    const getData = async () => {
      try {
        await axios
          .get(`${URL}/test/gettestformation/${testID}`)
          .then((response) => {
            // console.log(response.data);
            setStudentTest(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  console.log(studentTest);
  return <div>StudentTestNav</div>;
};

export default StudentTestNav;
