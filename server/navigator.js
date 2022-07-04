
// DATA 
const cities = 'Frankfurt Mannheim Würzburg Stuttgart Nürnberg Kassel Karlsruhe Erfurt Augsburg München'.split(' ');

const routes = [
    ['Frankfurt', 'Mannheim'],
    ['Frankfurt', 'Würzburg'],
    ['Stuttgart', 'Mannheim'],
    ['Frankfurt', 'Kassel'],
    ['Karlsruhe', 'Mannheim'],
    ['Stuttgart', 'Karlsruhe'],
    ['Stuttgart', 'Augsburg'],
    ['Augsburg', 'München'],
    ['Kassel', 'Würzburg'],
    ['Würzburg', 'Nürnberg'],
    ['München', 'Nürnberg'],
    ['München', 'Würzburg'],
    ['Nürnberg', 'Erfurt'],
    ['Frankfurt', 'Erfurt'],
];

// The graph
const adjacencyList = new Map();

// The parent for each node.
const parents = new Map();

// The search results.
let results = [];

// Add Node 
function addNode(city) {
    adjacencyList.set(city, []);
} 

function addEdge(origin, destination) {
    adjacencyList.get(origin).push(destination);
    adjacencyList.get(destination).push(origin);
}

// Create the graph
cities.forEach(addNode);
routes.forEach(route => addEdge(...route));

// Breadth-first search (BFS)
function bfs(start, target) {

    const visited = new Set();

    const queue = [start]; // first-in, first-out data structure of cities to look at
  
    while (queue.length > 0) {
       
        const city = queue.shift(); // look at the first element and remove it from queue
        const connections = adjacencyList.get(city);

        for (const connection of connections) {
            
            if (connection === target) {
                console.log('found target');
                parents.set(connection, city);
                reconstructPath(start, target);
            }

            if (!visited.has(connection)) {
                visited.add(connection);
                queue.push(connection);
                console.log(connection);
                parents.set(connection, city);
            }
        }
    }
}

// Depth-first search (DFS)
function dfs(start, target, visited = new Set()) {
    console.log(start);
    visited.add(start);

    const connections = adjacencyList.get(start);

    for (const connection of connections) {
        if (connection === target) {
            console.log('found target');
            return;
        }
    
        if (!visited.has(connection)) {
            dfs(connection, target, visited);
        }
    }
}

function reconstructPath(start, target){
    console.log('reconstruct path');
    const path = [target];

    let node = target;
    while (node !== start) {
        let parent = parents.get(node);
        path.push(parent);
        node = parent;
    }
    results.push(path.reverse());
}

// Search for train connections between start and end point.
function searchConnection(start, end) {
     results = [];

    // Check for sanitized input
    if (!cities.includes(start) || !cities.includes(end)) {
        console.log('Could not search for connection. Start or End City is not available.');
        console.log('Start' + start + 'End: ' + end);
        return [];
    }
  
    // Run search / traverse
    bfs(start, end);
    // dfs(start, end);

    // Handle search result
    console.log('the result is: ')
    console.log(results);

    return results;
}

// // Setup search
// const start = 'Stuttgart';
// const end = 'Kassel';


export { searchConnection };


