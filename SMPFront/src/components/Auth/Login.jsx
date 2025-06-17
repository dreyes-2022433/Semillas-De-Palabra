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
  Image,
  VStack,
  HStack,
  Divider,
  Flex
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useLogin } from '../../shared/useLogin.jsx'


const MotionBox = motion(Box)
const MotionText = motion(Text)

export const Login = ({ handleIsLogin }) => {
  const { login, isLoading } = useLogin()
  const [formData, setFormData] = useState({ CUI: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [CUIValid, setCUIValid] = useState(false)
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
    login(formData.CUI, formData.password)
  }

  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    if (field === 'CUI') isValid = /^[0-9]{13}$/.test(value)
    if (field === 'password') isValid = value.length >= 6
    if (field === 'CUI') setCUIValid(isValid)
    if (field === 'password') setPasswordValid(isValid)
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
      bgGradient="linear(to-br, green.100, green.200, white)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
    >  
      <MotionBox
        w="100%"
        maxW="1100px"
        mx="auto"
        bg="white"
        borderRadius="2xl"
        boxShadow="dark-lg"
        overflow="hidden"
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <MotionBox
          w={{ base: '100%', md: '50%' }}
          bgGradient="linear(to-br, green.400, green.500, green.600)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={10}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image
            src='https://res.cloudinary.com/dxvwrech8/image/upload/v1750136553/LOGO_SEMILLA_DE_PALABRA-05_cgd7rh.png'
            alt="Logo"
            boxSize={{ base: '140px', md: '220px' }}
            objectFit="contain"
          />
        </MotionBox>

        <MotionBox
          w={{ base: '100%', md: '50%' }}
          p={{ base: 8, md: 12 }}
          bg="white"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <VStack spacing={8} align="stretch">
            <MotionText
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="bold"
              color="green.600"
              textAlign="center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Bienvenido a Huerto de Palabras
            </MotionText>

            <FormControl id="CUI" isInvalid={!CUIValid}>
              <FormLabel>CUI o Usuario</FormLabel>
              <Input
                type="text"
                placeholder="1234567890123"
                value={formData.CUI}
                onChange={(e) => handleValueChange(e.target.value, 'CUI')}
                onBlur={(e) => handleValidationOnBlur(e.target.value, 'CUI')}
                variant="filled"
                focusBorderColor="green.400"
              />
            </FormControl>

            <FormControl id="password" isInvalid={!passwordValid}>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleValueChange(e.target.value, 'password')}
                  onBlur={(e) => handleValidationOnBlur(e.target.value, 'password')}
                  variant="filled"
                  focusBorderColor="green.400"
                />
                <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: 'transparent' }}
                  _active={{ backgroundColor: 'transparent' }}
                  _focus={{ boxShadow: 'none' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>


            <Button
              colorScheme="green"
              onClick={handleLogin}
              isLoading={isLoading}
              isDisabled={!CUIValid || !passwordValid}
              width="full"
              borderRadius="md"
              fontWeight="bold"
              transition="all 0.3s"
              _hover={{ transform: 'scale(1.03)', boxShadow: 'xl' }}
            >
              Iniciar Sesión
            </Button>

            <Divider borderColor="gray.300" />

            <HStack spacing={1} justifyContent="center">
              <Text fontSize="sm" color="gray.600">
                ¿Olvidaste tu contraseña?
              </Text>
              <Text fontSize="sm" color="green.500" fontWeight="medium" cursor="pointer">
                Recuperarla aquí
              </Text>
            </HStack>

            <Flex justifyContent="center" alignItems="center">
              <Text fontSize="sm" color="gray.600">¿No tienes cuenta?</Text>
              <Text
                fontSize="sm"
                color="green.600"
                cursor="pointer"
                fontWeight="medium"
                ml={1}
                onClick={handleIsLogin}
              >
                Regístrate aquí
              </Text>
            </Flex>
          </VStack>
        </MotionBox>
      </MotionBox>
    </Box>
  )
}
