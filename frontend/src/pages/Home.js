import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { user } = useAuthContext();

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        console.log(json.allWorkOut);

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json.allWorkOut });
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        <header className="App-header">
          {!isOnline && (
            <p className="online-check">
              Please check your internet connection and try again.
            </p>
          )}
        </header>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
        {/* {Array.isArray(workouts) &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))} */}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
