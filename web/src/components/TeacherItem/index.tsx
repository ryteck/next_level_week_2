import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'

const TeacherItem: React.FC = () => {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80" alt="cat" />
                <div>
                    <strong>Ryan Martins</strong>
                    <span>Programação</span>
                </div>
            </header>
            <p>Entusiasta das melhores tecnologias de programação avançada.</p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$100,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem