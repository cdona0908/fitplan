import React from 'react';

const ExerciseList = ({ exercises }) => {
    const { _id, exerciseTitle, image, exerciseDescription } = exercises;

    if (!exercises.length) {
        return <h3>No Exercises Yet</h3>;
      }
    
      return (
        <div>
          <h3>{exerciseTitle}</h3>
          {exercises &&
            exercises.map(exercise => (
              <div key={exercise._id} className="card mb-3"> 
                              
                <p className="card-header">
                  {exercise.exerciseTitle}                  
                </p>
                <div className="card-body">
                  <p>{exercise.exerciseDescription}</p>                  
                </div>
              </div>
            ))}
        </div>
    );
}

export default ExerciseList;