import { useState } from "react"
import React from "react"
import axios from "axios"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
  Text,
  Icon,
  useToast,
  FormControl,
  FormHelperText,
  Badge,
  Flex,
} from "@chakra-ui/react"
import { AddIcon, AttachmentIcon } from "@chakra-ui/icons"

export const VideoContent = ({ moduleId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [video, setVideo] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const firstField = React.useRef()
  const toast = useToast()

  const handleInputChangeContent = (e) => {
    setContentForm({ ...contentForm, [e.target.name]: e.target.value })
    console.log(contentForm)
  }

  const handleInputImage = (e) => {
    setContentForm({ ...contentForm, video: e.target.files[0] })
  }

  const [contentForm, setContentForm] = useState({
    video: video,
    moduleId: moduleId,
    name: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("video", contentForm.video)
      formData.append("moduleId", contentForm.moduleId)
      formData.append("name", contentForm.name)
      const response = await axios.post("http://localhost:3678/v1/videoLesson/uploadVideoLesson", formData)
      console.log("Respuesta del servidor:", response.data)

      setContentForm({
        name: "",
      })

      toast({
        title: "Contenido creado exitosamente",
        description: "El contenido del módulo ha sido guardado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })

      onClose()
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      toast({
        title: "Error al crear contenido",
        description: "Hubo un problema al guardar el contenido. Inténtalo de nuevo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const OptionGroup = ({ optionNumber, audioName, answerName }) => (
    <Box
      p={4}
      borderWidth="2px"
      borderRadius="xl"
      borderColor="#a7c957"
      bg="#f2e8cf"
      _hover={{
        bg: "#ede2c4",
        borderColor: "#6a994e",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px rgba(109, 153, 78, 0.15)",
      }}
      transition="all 0.3s ease"
    >
      <VStack spacing={3} align="stretch">
        <Flex align="center" justify="space-between">
          <Text fontWeight="bold" color="#2d5016" fontSize="md">
            Opción {optionNumber}
          </Text>
          <Badge bg="#a7c957" color="#2d5016" px={3} py={1} borderRadius="full" fontWeight="semibold">
            Audio + Respuesta
          </Badge>
        </Flex>

        <FormControl>
          <FormLabel fontSize="sm" color="#386641" fontWeight="semibold">
            Texto del audio
          </FormLabel>
          <Input
            name={audioName}
            placeholder={`Escribe el contenido del audio para la opción ${optionNumber}`}
            onChange={handleInputChangeContent}
            value={contentForm[audioName]}
            bg="white"
            borderColor="#a7c957"
            _hover={{ borderColor: "#6a994e" }}
            _focus={{
              borderColor: "#386641",
              boxShadow: "0 0 0 3px rgba(167, 201, 87, 0.1)",
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" color="#386641" fontWeight="semibold">
            ¿Es la respuesta correcta?
          </FormLabel>
          <Select
            onChange={handleInputChangeContent}
            name={answerName}
            value={contentForm[answerName]}
            bg="white"
            borderColor="#a7c957"
            _hover={{ borderColor: "#6a994e" }}
            _focus={{
              borderColor: "#386641",
              boxShadow: "0 0 0 3px rgba(167, 201, 87, 0.1)",
            }}
          >
            <option value="">Selecciona una opción</option>
            <option value="True">Verdadero</option>
            <option value="False">Falso</option>
          </Select>
        </FormControl>
      </VStack>
    </Box>
  )

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        bg="#6a994e"
        color="white"
        onClick={onOpen}
        size="lg"
        borderRadius="xl"
        boxShadow="0 4px 15px rgba(109, 153, 78, 0.3)"
        _hover={{
          bg: "#386641",
          transform: "translateY(-3px)",
          boxShadow: "0 6px 20px rgba(109, 153, 78, 0.4)",
        }}
        _active={{
          bg: "#2d5016",
          transform: "translateY(-1px)",
        }}
        transition="all 0.3s ease"
        fontWeight="bold"
        px={8}
        py={6}
      >
        Agrega un video
      </Button>

      <Drawer isOpen={isOpen} placement="right" initialFocusRef={firstField} onClose={onClose} size="lg">
        <DrawerOverlay bg="rgba(45, 80, 22, 0.4)" backdropFilter="blur(10px)" />
        <DrawerContent>
          <DrawerCloseButton size="lg" color="white" _hover={{ bg: "rgba(255, 255, 255, 0.2)" }} />
          <DrawerHeader
            borderBottomWidth="2px"
            borderColor="#a7c957"
            bg="linear-gradient(135deg, #6a994e 0%, #386641 100%)"
            color="white"
            py={8}
          >
            <VStack align="start" spacing={2}>
              <Text fontSize="2xl" fontWeight="bold">
                Crear contenido para el módulo
              </Text>
              <Text fontSize="md" opacity={0.9}>
                Completa todos los campos para crear una nueva pregunta
              </Text>
            </VStack>
          </DrawerHeader>

          <DrawerBody py={6} bg="#f2e8cf">
            <VStack spacing={8} align="stretch">
              {/* Información básica */}
              <Box
                p={6}
                bg="white"
                borderRadius="xl"
                borderWidth="2px"
                borderColor="#a7c957"
                boxShadow="0 2px 10px rgba(109, 153, 78, 0.1)"
              >
                <Text fontSize="xl" fontWeight="bold" color="#2d5016" mb={6}>
                  📝 Información básica
                </Text>

                <VStack spacing={5} align="stretch">
                  <FormControl isRequired>
                    <FormLabel color="#386641" fontWeight="semibold" fontSize="md">
                      Nombre del contenido
                    </FormLabel>
                    <Input
                      ref={firstField}
                      name="name"
                      placeholder="Introduce un nombre descriptivo"
                      onChange={handleInputChangeContent}
                      value={contentForm.name}
                      size="lg"
                      borderColor="#a7c957"
                      _hover={{ borderColor: "#6a994e" }}
                      _focus={{
                        borderColor: "#386641",
                        boxShadow: "0 0 0 3px rgba(167, 201, 87, 0.1)",
                      }}
                    />
                    <FormHelperText color="#7ba05b">Este nombre te ayudará a identificar el contenido</FormHelperText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="#386641" fontWeight="semibold" fontSize="md">
                      <HStack>
                        <Icon as={AttachmentIcon} color="#6a994e" />
                        <Text>Imagen</Text>
                      </HStack>
                    </FormLabel>
                    <Input
                      type="file"
                      onChange={handleInputImage}
                     name="video"
                      size="lg"
                      p={3}
                      borderColor="#a7c957"
                      _hover={{ borderColor: "#6a994e" }}
                      _focus={{
                        borderColor: "#386641",
                        boxShadow: "0 0 0 3px rgba(167, 201, 87, 0.1)",
                      }}
                    />
                    <FormHelperText color="#7ba05b">Sube una imagen que acompañe a la pregunta</FormHelperText>
                  </FormControl>
                </VStack>
              </Box>

            </VStack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="2px" borderColor="#a7c957" bg="#ede2c4" py={6}>
            <HStack spacing={4}>
              <Button
                variant="outline"
                onClick={onClose}
                size="lg"
                borderRadius="xl"
                borderColor="#bc4749"
                color="#bc4749"
                _hover={{
                  bg: "#bc4749",
                  color: "white",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.3s ease"
                fontWeight="semibold"
                px={8}
              >
                Cancelar
              </Button>
              <Button
                bg="#6a994e"
                color="white"
                onClick={handleSubmit}
                isLoading={isLoading}
                loadingText="Guardando..."
                size="lg"
                borderRadius="xl"
                boxShadow="0 4px 15px rgba(109, 153, 78, 0.3)"
                _hover={{
                  bg: "#386641",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(109, 153, 78, 0.4)",
                }}
                _active={{
                  bg: "#2d5016",
                  transform: "translateY(0px)",
                }}
                transition="all 0.3s ease"
                fontWeight="bold"
                px={8}
              >
                Guardar contenido
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
