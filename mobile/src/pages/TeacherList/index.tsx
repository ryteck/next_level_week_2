import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'
import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { TeacherInterface } from '../../components/TeacherItem'

function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)

    const [subject, setSubject] = useState('')
    const [weekDay, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])

    function loadFavorites() {
        AsyncStorage.getItem('favorite').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: TeacherInterface) => teacher.id)
                setFavorites(favoritedTeachersIds)
            }
        })
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit() {
        loadFavorites()
        const response = await api.get('classes', {
            params: {
                subject,
                week_day: weekDay,
                time
            }
        })
        setTeachers(response.data)
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys Disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}
            >
                {
                    isFiltersVisible
                    &&
                    (
                        <View style={styles.searchForm}>
                            <Text style={styles.label}>Matéria</Text>
                            <TextInput
                                placeholderTextColor="#c1bccc"
                                style={styles.input}
                                placeholder="Qual a matéria?"
                                value={subject}
                                onChangeText={text => setSubject(text)}
                            />
                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Dia da semana</Text>
                                    <TextInput
                                        placeholderTextColor="#c1bccc"
                                        style={styles.input}
                                        placeholder="Qual o dia?"
                                        value={weekDay}
                                        onChangeText={text => setWeekDay(text)}
                                    />
                                </View>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Horário</Text>
                                    <TextInput
                                        placeholderTextColor="#c1bccc"
                                        style={styles.input}
                                        placeholder="Qual horário?"
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                    />
                                </View>
                            </View>

                            <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                                <Text style={styles.submitButtonText}>Filtrar</Text>
                            </RectButton>
                        </View>
                    )
                }
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24
                }}
            >
                {teachers.map((teacher: TeacherInterface) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList