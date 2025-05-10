import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setxIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i= 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    // Check if the board is full
    if (!squares.includes(null)){return

    }
    return null;
  };

  const handlePress = (index) => {
    if (board[index] || gameOver) {
      return;
    }
    //create a copy of the board
    const newBoard = [...board];
    //place x or o in the square

    newBoard[index] = xIsNext ? 'X' : 'O';
    //update the board
    setBoard(newBoard);
    setxIsNext(!xIsNext);
    //check for winner
    const winner = calculateWinner(newBoard);
    setTimeout (()=>{if (winner) {}
      setGameOver(true);
      if(winner === 'Draw'){
        Alert.alert('Game over', 'The game is a draw!', 
          [{ text: 'play again', onPress: resetGame }]);
      }else{
        Alert.alert('Game over', `Player ${winner} wins!`, 
          [{ text: 'play again', onPress: resetGame }]);
        }}, 100);
  };

  const resetGame = () => (
   setBoard(Array(9).fill(null)),
    setxIsNext(true),
    setGameOver(false) 
  );

  const renderSquare = (index) => (
    <TouchableOpacity
      key={index}
      style={styles.square}
      onPress={() => handlePress(index)}
      activeOpacity={0.8}
    >
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );
  //game status message 
  const getStatus= () => {
    const winner = calculateWinner(board);
    if (winner) {
      return winner === 'Draw' ? 'It\'s a draw!' : `Winner: ${winner}`;
    }
    return `Next player: ${xIsNext ? 'X' : 'O'}`;
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {Array(3)
          .fill(null)
          .map((_, row) => (
            <View key={row} style={styles.row}>
              {Array(3)
                .fill(null)
                .map((_, col) => renderSquare(row * 3 + col))}
            </View>
          ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '33.33%',
  },
  square: {
    width: '33.33%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  squareText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
// This code is a simple Tic Tac Toe game built with React Native. It includes a 3x3 grid where players can take turns placing their marks (X or O). The game checks for a winner or a draw and displays an alert when the game ends. The board can be reset to start a new game.