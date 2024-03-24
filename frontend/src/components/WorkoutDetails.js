import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formDistanceToNow from "date-fns/formatDistanceToNow";
import React, { useState, useEffect } from "react";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    try {
      const response = await fetch("/api/workouts/" + workout._id, {
        method: "DELETE",
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: json.deleteResult });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails