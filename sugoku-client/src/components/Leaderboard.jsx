import React from "react";
import { View, Text, FlatList } from "react-native";
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

  const renderPlayer = player => {
    return (
      <DataTable.Row>
        <DataTable.Cell>{player.name}</DataTable.Cell>
        <DataTable.Cell numeric>{player.score}</DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Player Name</DataTable.Title>
        <DataTable.Title numeric>Score</DataTable.Title>
      </DataTable.Header>
      {/* {leaderboard.length > 0 && renderPlayers()} */}
      <FlatList
        data={leaderboard}
        renderItem={({ item }) => renderPlayer(item)}
        keyExtractor={item => item.id}
      />
    </DataTable>
  );
};
