import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Input, Button, Text, Avatar, ListItem } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

const Stack = createStackNavigator();
const data = [
  { id: '1', name: 'João Silva', numero: '+55 81976523412', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Maria Souza', numero: '+55 81976542672', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '3', name: 'Carlos Oliveira', numero: '+55 81979233412', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
];

function telalogin({navigation}) {
  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Avatar
            size="large"  
            rounded
            source={{ uri: "https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png" }}
            containerStyle={styles.avatar}
          />
          
          <Text h3 style={styles.title}>Bem-vindo</Text>
          
          <Input
            placeholder='Email'
            leftIcon={{type: 'material', name: 'email', color: '#fff'}}
            autoCapitalize='none'
            inputStyle={styles.inputText}
            placeholderTextColor="#ddd"
            inputContainerStyle={styles.inputContainer}
          />
          
          <Input
            placeholder='Senha'
            leftIcon={{type: 'material', name: 'lock', color: '#fff'}}
            secureTextEntry
            inputStyle={styles.inputText}
            placeholderTextColor="#ddd"
            inputContainerStyle={styles.inputContainer}
          />
          
          <View style={styles.buttonGroup}>
            <Button
              title="Login"
              buttonStyle={styles.primaryButton}
              titleStyle={styles.buttonTitle}
              onPress={()=> navigation.navigate('ListaCon')}
            />
            
            <Button
              title="Cadastrar"
              type="outline"
              buttonStyle={styles.secondaryButton}
              titleStyle={[styles.buttonTitle, {color: '#fff'}]}
              onPress={()=> navigation.navigate('Cadastrar')}
            />
            
            <TouchableOpacity onPress={()=> navigation.navigate('RecSenha')}>
              <Text style={styles.linkText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}


function Cadastrar({navigation}) {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Usuário</Text>

      <Input
      placeholder='Nome'
      leftIcon={{type: 'material', name: 'email'}}
      autoCapitalize='none'
      />
      <Input
      placeholder='CPF'
      leftIcon={{type: 'material', name: 'email'}}
      autoCapitalize='none'
      />
      <Input
      placeholder='Email'
      leftIcon={{type: 'material', name: 'email'}}
      keyboardType='email-adress'
      autoCapitalize='none'
      />
       <Input
      placeholder='senha'
      leftIcon={{type: 'material', name: 'lock'}}
      secureTextEntry
      />
      <Button
      title="Salvar"
      buttonStyle= {styles.button}
      onPress={()=> navigation.navigate('telalogin')}
      />
    </View>
  );
}


function ListaCon({navigation, route}) {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Usuário</Text>


      <Button
      title="Meus contatos"
      buttonStyle= {styles.button}
      onPress={()=> navigation.navigate('meusctt')}
      />
    
    </View>
  );
}

function DetalhesContato({ navigation, route }) {
  const { contato } = route.params;

  return (
    <View style={styles.container}>
      <Avatar
        size="xlarge"
        rounded
        source={{ uri: "https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png" }}
        containerStyle={styles.avatar}
      />
      
      <Text h3 style={styles.detailTitle}>{contato.name}</Text>
      <Text h4 style={styles.detailSubtitle}>{contato.numero}</Text>
      
      <Button
        title="Voltar"
        buttonStyle={styles.button}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

function meusctt({navigation, route}) {
  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => navigation.navigate('DetalhesContato', { contato: item })}
    >
      <Avatar
        rounded
        source={{ uri: item.avatar }}
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.numero}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}






function RecSenha({navigation}) {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>RecuperarSenha</Text>

      <Input
      placeholder='nova senha'
      leftIcon={{type: 'material', name: 'lock'}}
      secureTextEntry
      />
       <Input
      placeholder='confirmar nova senha'
      leftIcon={{type: 'material', name: 'lock'}}
      secureTextEntry
      />
      <Button
      title="entrar"
      buttonStyle= {styles.button}
      onPress={()=> navigation.navigate('telalogin')}
      />
    </View>
  );
}

function Cadastrarctt({navigation}) {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>RecuperarSenha</Text>

      <Input
      placeholder='Nome de Usuário'
      autoCapitalize='none'
      
      />
       <Input
      placeholder='Número do Usuário'
      autoCapitalize='none'
      
      />
      <Button
      title="entrar"
      buttonStyle= {styles.button}
      onPress={()=> navigation.navigate('telalogin')}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="telalogin">
        <Stack.Screen name="telalogin" component={telalogin} options={{headerStyle: {  backgroundColor: '#6a11cb',}, headerTintColor: '#fff',headerTitleStyle: { fontWeight: 'bold', }, }}/>
        <Stack.Screen name="Cadastrar" component={Cadastrar} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="RecSenha" component={RecSenha} options={{ title: 'Recupere aqui' }} />
        <Stack.Screen name="meusctt" component={meusctt} options={{ title: 'Lista de Contatos' }} />
        <Stack.Screen name="Cadastrarctt" component={Cadastrarctt} options={{ title: 'Cadastrar Contato' }} />
        <Stack.Screen name="DetalhesContato" component={DetalhesContato} options={{ title: 'Detalhes do Contato' }} />
        
        <Stack.Screen 
          name="ListaCon" 
          component={ListaCon} 
          options={({ navigation }) => ({
            title: 'Meus Contatos',
            headerRight: () => (
              <Button
                icon={{
                  name: 'add',
                  type: 'material',
                  size: 24,
                  color: 'blue',
                }}
                buttonStyle={{
                  backgroundColor: 'transparent',
                  marginRight: 10,
                }}
                onPress={() => navigation.navigate('Cadastrarctt')} 
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    padding: 25,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  avatar: {
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#fff',
    alignSelf: 'center',
  },
  title: {
    marginBottom: 30,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 8,
    height: 50,
  },
  inputText: {
    color: '#fff',
  },
  buttonGroup: {
    width: '100%',
    marginTop: 15,
  },
  primaryButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 12,
  },
  secondaryButton: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  buttonTitle: {
    color: '#6a11cb',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
