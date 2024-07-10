import React from "react";
import "./courseCard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className="course-card">
       {/* <img src={`${server}/${course.image}`} alt="" className="course-image" /> */}
      <img src={course.image} alt="" className="course-image" />
      <h3>{course.title}</h3>
      <p>Instructor- {course.createdBy}</p>
      <p>Duration- {course.duration} weeks</p>
      <p>Price- ₹{course.price}</p>
      {/* check if user is authenticated, yhen only he will go to course card, else, will be navigated to login */}
      {/* a?b:c => if a true, then b , else c */}
      {isAuth ? (
        // if user is authenticated, check whether user is admin or not
        <>
          {user && user.role !== "admin" ? (
            <>
            {/* if user is not admin , then check whether the user has buyed/subscribed this course or not */}
              {user.subscription.includes(course._id) ? (
                // if user is subsribed to this page, he is directed to the course study page, where there are lectures
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                //if user has not subscribed, he will be directed to course description page where Buy Course option will be there
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="common-btn"
                >
                  Get Started
                </button>
              )}
            </>
          ) : (
            // if user is admin, he is authorizeed to this page
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn"
            >
              Study
            </button>
          )}
        </>
      ) : (
        // if not authenticated
        <button onClick={() => navigate("/login")} className="common-btn">
          Get Started
        </button>
      )}

      <br />
      
      {/* Deleting the course, only admin can */}
      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="common-btn"
          style={{ background: "red" }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CourseCard;
