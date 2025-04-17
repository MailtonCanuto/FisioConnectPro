'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    console.log('Formulário enviado')

    try {
      console.log('Tentando fazer login com:', { email, password })
      if (email && password) {
        const sessionData = {
          user: {
            id: '1',
            name: 'Usuário Teste',
            email: email,
            role: 'admin'
          },
          token: 'mock-token',
          expiresIn: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60
        }

        localStorage.setItem('session', JSON.stringify(sessionData))
        console.log('Redirecionando para /dashboard')
        router.push('/dashboard')
      } else {
        setError('Por favor, preencha todos os campos')
      }
    } catch (err) {
      console.error(err)
      setError('Erro ao fazer login. Tente novamente.')
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row">
        {/* Seção Lateral */}
        <div className="w-full lg:w-1/2 bg-primary-600 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center">
          <div className="w-full bg-white rounded-xl p-4 mb-8 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-85 h-55 relative mb-4 flex items-center justify-center">
              <Image
                src="/images/brand/logo.png"
                alt="Fisioconectpro"
                width={600}
                height={200}
                priority
                className="object-contain"
              />
            </div>
            <p className="text-xl text-center text-gray-600 mt-4">
              <br></br>Sistema de Gestão para Clínicas de Fisioterapia
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>

        {/* Seção de Login */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div className="w-40 h-40 relative">
              <Image
                src="/images/brand/logo.png"
                alt="Fisioconectpro"
                width={160}
                height={160}
                priority
                className="object-contain"
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-primary-600">
              FISIOCONECTPRO
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sistema de Gestão para Clínicas de Fisioterapia
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Bem-vindo de volta</h2>
            <p className="text-gray-600 text-center mb-8">Faça login para acessar sua conta</p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Lembrar de mim
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 