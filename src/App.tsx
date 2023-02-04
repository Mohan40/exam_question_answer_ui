import "./styles.css";
import Modal from "./component/modal";
import useModal from "../src/hooks/useModal";
import React, { useState } from "react";
import { test_data } from "./component/data";

let answers: any = {};
export default function App() {
  const { isOpen, toggle } = useModal();
  const [current, setCurrent] = useState(0);
  let length = test_data.questions.length;

  const [data, setData] = useState("");
  const [questionNo, setQuestionNo] = useState(0);
  let checkBoxArrayLength = 0;
  test_data.questions.forEach((element) => {
    if (element.questiontype.toLowerCase() === "checkbox") {
      checkBoxArrayLength = element.questionoption.length;
    }
  });
  const [checkedState, setCheckedState] = useState(
    new Array(checkBoxArrayLength).fill(false)
  );
  let lastPage = false;

  function nextSlide() {
    answers[questionNo] = data;
    if (current !== length) {
      setCurrent(current + 1);
    } else {
      lastPage = true;
    }
  }
  function prevSlide() {
    setCurrent(current === 0 ? length - 1 : current - 1);
  }

  function submitData() {
    setCurrent(current + 1);
    nextSlide();
  }

  function handleOptions(e: any, quesNum: number) {
    let a: any = document.getElementById(e.target.id);
    setData(a.value);
    setQuestionNo(quesNum);
  }

  function handleInput(e: any, quesNum: number) {
    let a: any = document.getElementById(e.target.id);
    setData(a.value);
    setQuestionNo(quesNum);
  }

  function handleCheckbox(position: any, quesNum: number) {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    let checkBoxData: any = [];
    updatedCheckedState.map((perCheck, idx) => {
      if (perCheck === true) {
        test_data.questions.map((item) => {
          if (item.questiontype.toLowerCase() === "checkbox") {
            checkBoxData.push(item.questionoption[idx].optionvalue);
          }
        });
      }
    });
    setData(checkBoxData);
  }

  return (
    <div className="App">
      <center>
        <h1>Exam Question & Answer UI</h1>{" "}
      </center>
      <center>
        <span>
          <br></br>
        </span>
        <h4>Please click on the below button to start the test.</h4>
        <span>
          <br></br>
          <br></br>
        </span>
      </center>
      <div className="startExamButton">
        <button onClick={toggle}>Start Exam</button>
      </div>
      <span>
        <br></br>
        <br></br>
      </span>
      {current !== length ? (
        <Modal isOpen={isOpen} toggle={toggle}>
          <div>
            {test_data.questions.map((item: any, index: any) => {
              return (
                index === current && (
                  <div className="actual_content">
                    <p className="question">
                      Q{item.questionid}.{" "}
                      {item.question[0].toUpperCase() + item.question.slice(1)}?
                    </p>
                    <span />
                    {item.questiontype.toLowerCase() === "radio"
                      ? item.questionoption.map((option: any) => {
                          return (
                            <div>
                              <input
                                type={item.questiontype}
                                id={option.optionid}
                                value={option.optionvalue}
                                name={"option"}
                                onChange={(e) =>
                                  handleOptions(e, item.questionid)
                                }
                              />
                              <label>&nbsp; {option.optionvalue}</label>
                              <br />
                            </div>
                          );
                        })
                      : item.questiontype.toLowerCase() === "checkbox"
                      ? item.questionoption.map((option: any, index: any) => {
                          return (
                            <div>
                              <input
                                type={item.questiontype}
                                id={option.optionid}
                                value={option.optionvalue}
                                checked={checkedState[index]}
                                onChange={(e) =>
                                  handleCheckbox(index, item.questionid)
                                }
                              />
                              <label>&nbsp; {option.optionvalue}</label>
                              <br />
                            </div>
                          );
                        })
                      : item.questiontype.toLowerCase() === "text" || "textarea"
                      ? item.questionoption.map((option: any) => {
                          return (
                            <div>
                              <input
                                type={item.questiontype}
                                id={option.optionid}
                                value={data}
                                onChange={(e) =>
                                  handleInput(e, item.questionid)
                                }
                              />
                              {/* <label>&nbsp; (option.optionvalue}</label> */}
                              <br />
                            </div>
                          );
                        })
                      : item.questionoption.map((option: any) => {
                          return (
                            <div>
                              <input
                                type={item.questiontype}
                                id={option.optionid}
                                value={data}
                                onChange={(e) =>
                                  handleInput(e, item.questionid)
                                }
                              />
                              <label>&nbsp; {option.optionvalue}</label>
                              <br />
                            </div>
                          );
                        })}
                    <div className="footer_btn">
                      <button className="prev_btn" onClick={prevSlide}>
                        Prev
                      </button>
                      {current !== length - 1 && (
                        <button className="next_btn" onClick={nextSlide}>
                          Next
                        </button>
                      )}
                      {current === length - 1 && (
                        <button className="next_btn" onClick={submitData}>
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </Modal>
      ) : (
        <div className="ans_section">
          {" "}
          <center>Final Answers</center>
          <span>
            <br></br>
          </span>
          {test_data.questions.map((item, idx) => {
            return (
              <div className="answers">
                <p>
                  Q{item.questionid}.{" "}
                  {item.question[0].toUpperCase() + item.question.slice(1)}
                </p>
                <p>{answers[idx + 1]}</p>
                <br />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
