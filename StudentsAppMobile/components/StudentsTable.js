import { StyleSheet, View, Text, FlatList} from 'react-native';
function StudentRow(props){
    if(props.major ==='' || props.student.major.startsWith(props.major)){
        return(
            <View style={styles.item}>
                <Text style={styles.title}>{props.student.name}</Text>
                <Text>{props.student.email}</Text>
                <Text>{props.student.major}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 10,
    },
  });

function StudentsTable(props){
    return(
        <View style={styles.container}>
        <FlatList
          data={props.students}
          renderItem={({item}) => <StudentRow student={item} major={props.major} />}
          keyExtractor={item => item.name}
        />
      </View>)
    
}

export default StudentsTable;

