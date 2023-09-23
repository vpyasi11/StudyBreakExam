import React, { useState } from "react";

const StudentSections = () => {
  
  const [ studentSections, setStudentSections ] = useState();
  
  useEffect(() => {
    const testID = "64c6577c7964aa3933465480";
    const getData = async () => {
      try {
        await axios
          .get(`${URL}/test/gettestformation/${testID}`)
          .then((response) => {
            // console.log(response.data);
            setStudentSections(response.data);
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

  console.log(studentSections);

  return (
    <div>StudentSections</div>
  );
};

export default StudentSections;
