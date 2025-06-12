import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  Image
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRegister } from '../../shared/useRegister'
import logo from '../../assets/logo.png'

const MotionBox = motion(Box)

export const Register = ({ handleIsLogin }) => {
  const { register, isLoading } = useRegister()
  const [formData, setFormData] = useState({ surname: '',name: '',CUI: '', password: '', role: 'USER' })
  const [showPassword, setShowPassword] = useState(false)
  const [CUIValid, setCUIValid] = useState(false)
  const [nameValid, setNameValid] = useState(false)
  const [surnameValid, setSurnameValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const toast = useToast()

  const handleLogin = (e) => {
    e.preventDefault()
    if (!CUIValid || !passwordValid) {
      toast({
        title: 'Error',
        description: 'Por favor completa todos los campos correctamente',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
      return
    }
    register(formData)
  }

  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    if (field === 'CUI') isValid = /^[0-9]{13}$/.test(value)
    if (field === 'password') isValid = value.length >= 6
    if (field === 'name') isValid = /^[a-zA-Z\s]+$/.test(value) && value.length >= 2
    if (field === 'surname') isValid = /^[a-zA-Z\s]+$/.test(value) && value.length >= 2
    if (field === 'CUI') setCUIValid(isValid)
    if (field === 'password') setPasswordValid(isValid)
    if (field === 'name') setNameValid(isValid)
    if (field === 'surname') setSurnameValid(isValid)
   
  }

  const handleValueChange = (value, field) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }

  return (
    <Box
      minH="100vh"
      w="100%"
      bg="linear-gradient(to bottom right, #006400, #32CD32)"
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <MotionBox
        w={{ base: '100%', md: '40%' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="green.800"
        p={4}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={logo}
          alt="Logo Semilla de Palabras"
          boxSize="200px"
          objectFit="contain"
        />
      </MotionBox>

      <MotionBox
        w={{ base: '100%', md: '60%' }}
        bg="white"
        borderRadius={{ base: '0', md: 'lg' }}
        boxShadow="lg"
        p={8}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="green.600"
          mb={6}
          fontFamily="'Pier Sans', sans-serif"
        >
          Registrar usuario
        </Text>
        <FormControl id="Nombre" mb={4} isInvalid={!nameValid}>
          <FormLabel> Nombre </FormLabel>
          <Input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => handleValueChange(e.target.value, 'name')}
            onBlur={(e) => handleValidationOnBlur(e.target.value, 'name')}
          />
        </FormControl>
        <FormControl id="surname" mb={4} isInvalid={!surnameValid}>
          <FormLabel>Apellido</FormLabel>
          <Input
            type="text"
            placeholder="Apellido"
            value={formData.surname}
            onChange={(e) => handleValueChange(e.target.value, 'surname')}
            onBlur={(e) => handleValidationOnBlur(e.target.value, 'surname')}
          />
        </FormControl>

        <FormControl id="CUI" mb={4} isInvalid={!CUIValid}>
          <FormLabel>CUI o Nombre de usuario</FormLabel>
          <Input
            type="text"
            placeholder="CUI"
            value={formData.CUI}
            onChange={(e) => handleValueChange(e.target.value, 'CUI')}
            onBlur={(e) => handleValidationOnBlur(e.target.value, 'CUI')}
          />
        </FormControl>

        <FormControl id="password" mb={6} isInvalid={!passwordValid}>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) => handleValueChange(e.target.value, 'password')}
              onBlur={(e) => handleValidationOnBlur(e.target.value, 'password')}
            />
            <InputRightElement>
              <Button
                variant="link"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="green"
          width="100%"
          onClick={handleLogin}
          isLoading={isLoading}
          isDisabled={!CUIValid || !passwordValid}
          mb={4}
          handleIsLogin={handleIsLogin}
        >
          Registrar Usuario
        </Button>

        <Text fontSize="sm" color="gray.500">
          ¿Olvidaste tu contraseña?{' '}
          <Text as="span" color="green.600" cursor="pointer">
            Recuperarla aquí
          </Text>
        </Text>

        <Text fontSize="sm" mt={4}>
          Acceder{' '}
          <Text as="span" color="green.600" cursor="pointer" onClick={handleIsLogin}>
            Iniciar sesión aquí
          </Text>
        </Text>
      </MotionBox>
    </Box>
  )
}