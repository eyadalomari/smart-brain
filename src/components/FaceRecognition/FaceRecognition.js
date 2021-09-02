import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, box }) => {
    var rows = [];
    for (var i = 0; i < box.length; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rows.push(<div className='bounding-box' style={{ top: box[i].topRow, right: box[i].rightCol, bottom: box[i].bottomRow, left: box[i].leftCol }}></div>);
    }
    console.log("rows -> ",rows)
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id = "inputimage" alt='' src={ imageURL } width="600px" height="auto"></img>
                
                    {rows.map(function(d, idx){
                        return (d)
                    })}
                
                {/* <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div> */}

            </div>
        </div>
    );
}

export default FaceRecognition;