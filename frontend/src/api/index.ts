import { RegistrationInput } from '../components/registrationForm'
import axios from 'axios'

const API_DOMAIN = 'http://localhost'
const API_PORT = 3000

// In terms of Design Patterns, you could call this either a Facade, a Gateway or an Adapter.

export const api = {
  posts: {
    getPosts: () => {
      return axios.get(`${API_DOMAIN}:${API_PORT}/posts?sort=recent`)
    },
  },
  register: (input: RegistrationInput) => {
    return axios.post(`${API_DOMAIN}:${API_PORT}/users/new`, {
      ...input,
    })
  },
}
