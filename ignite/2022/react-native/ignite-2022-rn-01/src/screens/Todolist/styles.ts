import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        backgroundColor: '#191919',
        flex: 1,
        paddingHorizontal: 16,
    },
    form: {
        width: '100%',
        flexDirection: 'row',
        height: 56,
        top: -28,
        gap: 8
    },
    submitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    
        color: '#fff',
        backgroundColor: '#1e6f9f',
    
        padding: 16,
        borderRadius: 8,
    },
    todoListContainer: {
        flex: 1,
        paddingVertical: 16,
    },
    todoListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTextContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeContainer: {
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginLeft: 8,
        paddingHorizontal: 12,
        paddingVertical: 2,
    },
    badge: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    blueText: {
        color: '#4ea8de',
    },
    purpleText: {
        color: '#8284fa'
    },
    emptyTodoList: {
        flex: 1,
        paddingVertical: 64,
        alignItems: 'center',
        borderTopColor: '#333',
        borderTopWidth: 1,
        marginTop: 20
    },
    emptyTodoListText: {
        fontSize: 16,
        color: '#808080',
        fontWeight: 'bold',
        marginTop: 16,
    },
    descriptionText: {
        fontSize: 16,
        color: '#808080',
        marginTop: 4
    },
    todoList: {
        marginVertical: 16,
    },
    todoItem: {
        flexDirection: 'row',
        backgroundColor: '#262626',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        borderColor: '#808080',
        borderWidth: StyleSheet.hairlineWidth,
    },
    todoCompletedText: {
        fontSize: 16,
        color: '#808080',
        textDecorationLine: 'line-through',
        flex: 1,
    },
    todoItemText: {
        fontSize: 16,
        color: '#f2f2f2',
        flex: 1,
    },
    todoItemIcon: {
        borderColor: '#4ea8de',
        borderWidth: 1,
        borderRadius: 50,
        width: 18,
        height: 18,
        marginRight: 8,
    },
    todoItemIconCompleted: {
        borderColor: '#5e60ce',
        backgroundColor: '#5e60ce',
        borderWidth: 1,
        borderRadius: 50,
        width: 18,
        height: 18,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
})