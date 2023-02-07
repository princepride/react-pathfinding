import React from 'react';
import {Navbar,Container,Nav,NavDropdown,Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyNavBar.css";
import store from '../store';
import dijkstra from '../Algorithm/Findingpath/Dijkstra';
import aStar from '../Algorithm/Findingpath/AStar';
import getStairWall from '../Algorithm/Maze/SimpleStair';
import getRandomMaze from '../Algorithm/Maze/RandomMaze';
import getRecursiveMaze from '../Algorithm/Maze/RecursiveMaze';
import {setWallOfDepthFirstMaze,deletetWallOfDepthFirstMaze} from '../Algorithm/Maze/DepthFirstMaze';

const MyNavBar = () => {

    const handleBomb = (event) => {
        store.dispatch({type:"INITIAL_BOMB"});
        //console.log("bomb");
        // document.getElementById("bomb").style.display = "block";
    }

    const handleClearBoard = (event) => {
        store.dispatch({type:"INITIAL_BOARD"});
    }

    const handleClearWallWeights = (event) => {
        store.dispatch({type:"CLEAR_WALL_WEIGHTS"});
    }

    const handleClearBomb = (event) =>{
        store.dispatch({type:"CLEAR_BOMB"});
    }

    const handleClearPath = (event) =>{
        store.dispatch({type:"CLEAR_PATH"});
    }

    const handleSimpleStairMaze = (event) =>{
        const res=getStairWall();
        for(let i=0; i<res.length; i++){
            setTimeout(() =>{
                store.dispatch({type:"SET_WALL",xCoordinates:res[i][0],yCoordinates:res[i][1]});
            },5*i);
        }
    }

    const handleRandomMaze = (event) =>{
        const res=getRandomMaze();
        for(let i=0; i<res.length; i++){
            setTimeout(() =>{
                store.dispatch({type:"SET_WALL",xCoordinates:res[i][0],yCoordinates:res[i][1]});
            },5*i);
        }
    }

    const handleDepthFirstMaze = (event) =>{
        const setWallNodes=setWallOfDepthFirstMaze();
        for(let i=0; i<setWallNodes.length; i++){
            store.dispatch({type:"SET_WALL",xCoordinates:setWallNodes[i][0],yCoordinates:setWallNodes[i][1]});
        }
        const deleteWallNodes=deletetWallOfDepthFirstMaze();
        for(let i=0; i<deleteWallNodes.length;i++){
            setTimeout(() =>{
                store.dispatch({type:"DELETE_SIGNAL_WALL",xCoordinates:deleteWallNodes[i][0],yCoordinates:deleteWallNodes[i][1]});
            },5*i);
        }
    }


    const handleDijkstra = (event) =>{
        let visitedNodesIndex = dijkstra();
        store.dispatch({type:"SET_ALGORITHM",algorithm:"dijkstra"});
        console.log(store.getState().isAlgorithming[0]);
        for(let i = 0; i < visitedNodesIndex.length; i++){
            setTimeout(() =>{
                store.dispatch({type:"ANIMATE_PATHFINDING",
                xCoordinates:visitedNodesIndex[i].xCoordinates,
                yCoordinates:visitedNodesIndex[i].yCoordinates});
            },10*i);
        }
        let node = visitedNodesIndex[visitedNodesIndex.length-1];
        let nodePath=[]
        setTimeout(() =>{
            while(!node.isStart){
                nodePath.push(node);
                node = node.forwardNode;
            }
            nodePath.push(node);
            nodePath.reverse();
            for(let i=0;i<nodePath.length;i++){
                setTimeout(() =>{
                    store.dispatch({type:"SET_PATH",
                    xCoordinates:nodePath[i].xCoordinates,
                    yCoordinates:nodePath[i].yCoordinates});
                },10*i);
            }
        },10*visitedNodesIndex.length);
    }

    const handleAStar = (event) =>{
        let visitedNodesIndex = aStar();
        store.dispatch({type:"SET_ALGORITHM",algorithm:"dijkstra"});
        console.log(store.getState().isAlgorithming[0]);
        for(let i = 0; i < visitedNodesIndex.length; i++){
            setTimeout(() =>{
                store.dispatch({type:"ANIMATE_PATHFINDING",
                xCoordinates:visitedNodesIndex[i].xCoordinates,
                yCoordinates:visitedNodesIndex[i].yCoordinates});
            },10*i);
        }
        let node = visitedNodesIndex[visitedNodesIndex.length-1];
        let nodePath=[]
        setTimeout(() =>{
            while(!node.isStart){
                nodePath.push(node);
                node = node.forwardNode;
            }
            nodePath.push(node);
            nodePath.reverse();
            for(let i=0;i<nodePath.length;i++){
                setTimeout(() =>{
                    store.dispatch({type:"SET_PATH",
                    xCoordinates:nodePath[i].xCoordinates,
                    yCoordinates:nodePath[i].yCoordinates});
                },10*i);
            }
        },10*visitedNodesIndex.length);
    }

    const handleRecursiveMaze =()=>{
        const res=getRecursiveMaze();
        for(let i=0; i<res.length; i++){
            setTimeout(() =>{
                store.dispatch({type:"SET_WALL",xCoordinates:res[i][0],yCoordinates:res[i][1]});
            },5*i);
        }
    }

    return (
        <div className="navbar">
        <Navbar bg="light" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand href="#home">Pathfinding Visualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <NavDropdown title="Algorithms" id="algorithms-nav-dropdown">
                            <NavDropdown.Item id="dijkstra" href="#action/1.1" onClick={handleDijkstra}>Dijkstra's Algorithm</NavDropdown.Item>
                            <NavDropdown.Item id="aStar" href="#action/1.2" onClick={handleAStar}>A* Search</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.3">Greedy Best-first Search</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.4">Swarm Algorithm</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.5">Convergent Swarm Algorithm</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.6">Bidirectional Swarm Algorithm</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.7">Breadth-first Search</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.8">Depth-first Search</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Mazes&Patterns" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/2.1" onClick={handleRecursiveMaze}>Recursive Division Maze</NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.2" onClick={handleDepthFirstMaze}>Depth First Maze</NavDropdown.Item>
                            {/* <NavDropdown.Item href="#action/2.2">Recursive Division (vertical skew)</NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.3">Recursive Division (horizontal skew)</NavDropdown.Item> */}
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/2.4" onClick={handleRandomMaze}>Basic Random Maze</NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.5">Basic Weight Maze</NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.6" onClick={handleSimpleStairMaze}>Simple Stair Pattern</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link id="bomb" href="#add-bomb" onClick={handleBomb}>Add Bomb</Nav.Link>
                        {/* <Nav.Link href="#switch">Visualize!</Nav.Link> */}
                        <Nav.Link href="#clear-board" onClick={handleClearBoard}>Clear Board</Nav.Link>
                        <Nav.Link href="#clear-wall-weights" onClick={handleClearWallWeights}>CLear Wall&Weights</Nav.Link>
                        <Nav.Link href="#clear-path" onClick={handleClearPath}>Clear Path</Nav.Link>
                        <Nav.Link href="#clear-bomb" onClick={handleClearBomb}>Clear Bomb</Nav.Link>
                        <Navbar.Text id="basic-navbar-brand">Speed</Navbar.Text>
                            <Form.Range />
                            {/* <NavDropdown.Item href="#action/8.1">Fast</NavDropdown.Item>
                            <NavDropdown.Item href="#action/8.2">Normal</NavDropdown.Item>
                            <NavDropdown.Item href="#action/8.3">Slow</NavDropdown.Item> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
    )
}

export default MyNavBar;