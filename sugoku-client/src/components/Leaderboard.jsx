import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { DataTable } from "react-native-paper";

export default ({ navigation, route }) => {
  const leaderboard = useSelector(state => state.leaderboardReducer.players);

  const renderPlayers = () => {
    const playerRows = leaderboard.map((player, playerIdx) => {
      return (
        <DataTable.Row key={playerIdx}>
          <DataTable.Cell>{player.name}</DataTable.Cell>
          <DataTable.Cell numeric>{player.score}</DataTable.Cell>
        </DataTable.Row>
      );
    });
    return playerRows;
  };

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Player Name</DataTable.Title>
        <DataTable.Title numeric>Score</DataTable.Title>
      </DataTable.Header>
      {leaderboard.length > 0 && renderPlayers()}
    </DataTable>
  );
};
