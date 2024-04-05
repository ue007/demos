const { parse, stringify } = require('@foxglove/rosmsg');

const definitionStr = `
# geometry_msgs/Pose
geometry_msgs/Point position
geometry_msgs/Quaternion orientation

===
MSG: geometry_msgs/Point
float64 x
float64 y
float64 z

===
MSG: geometry_msgs/Quaternion
float64 x
float64 y
float64 z
float64 w
`;

console.log(JSON.stringify(parse(definitionStr), null, 2));

// stringify(messageDefinition) will return a canonical string, similar to _definitionStr_

// print the parsed message definition structure
console.log(JSON.stringify(parse(definitionStr, { ros2: true })));
