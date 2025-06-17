import { useState } from "react"
import React from 'react'
import axios from "axios"
import { imageQuestionRequest } from "../../services/api"
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
  Stack,
  Box,
  FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Select,
    Textarea

} from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'

export const ModuleContent = ({moduleId}) => {
const { isOpen, onOpen, onClose } = useDisclosure()
const [image, setImage] = useState()
const firstField = React.useRef()
const handleInputChangeContent = (e) => {
    setContentForm({ ...contentForm, [e.target.name]: e.target.value })
    console.log(contentForm)
  }
const handleInputImage = (e) => {
    setContentForm({ ...contentForm, image: e.target.files[0] }) 
}
   const [contentForm, setContentForm] = useState({
    image: image,
    moduleId: moduleId,
    name : '',
      mainAudio: '',
      audio1: '',
      answer1: '',
      audio2: '',
      answer2: '',
      audio3: '',
      answer3: '',
      audio4: '',
      answer4: ''
      
    })
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const formData = new FormData()
    formData.append('image', contentForm.image)
    formData.append('moduleId', contentForm.moduleId)
    formData.append('name', contentForm.name)
    formData.append('mainAudio', contentForm.mainAudio)
    formData.append('audio1', contentForm.audio1)
    formData.append('answer1', contentForm.answer1)
    formData.append('audio2', contentForm.audio2)
    formData.append('answer2', contentForm.answer2)
    formData.append('audio3', contentForm.audio3)
    formData.append('answer3', contentForm.answer3)
    formData.append('audio4', contentForm.audio4)
    formData.append('answer4', contentForm.answer4)
    const response =  await axios.post('http://localhost:3678/v1/imageQuestion/uploadImageQuestion', formData)
    console.log("Respuesta del servidor:", response.data)
    setContentForm({
        name : '',
      mainAudio: '',
      audio1: '',
      answer1: '',
      audio2: '',
      answer2: '',
      audio3: '',
      answer3: '',
      audio4: '',
      answer4: '',
      
    })
  } catch (error) {
    console.error("Error al enviar el formulario:", error)
  }
}


  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={onOpen}>
        Administrar contenido 
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Crea contenido para el módulo
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='username'>Nombre</FormLabel>
                <Input
                  ref={firstField}
                  name='name'
                  placeholder='Introduce el nombre del contenido'
                  onChange={handleInputChangeContent}
                />
              </Box>
              <Box>
                <FormLabel htmlFor='url'>Imagen</FormLabel>
                 <Input  htmlSize={4} width='auto' type="file" onChange={handleInputImage} />
              </Box>
              <Box>
                <FormLabel htmlFor='username'>AudioPrincipal</FormLabel>
                <Input
                  ref={firstField}
                  name='mainAudio'
                  placeholder='Escribe lo que quieres que diga el audio'
                  onChange={handleInputChangeContent}
                />
              </Box>
              <Box>
                <FormLabel htmlFor='username'>Opcion1</FormLabel>
                <Input
                  ref={firstField}
                  name='audio1'
                  placeholder='coloca una opcion de audio'
                  onChange={handleInputChangeContent}
                />
              </Box>
              <Box>
                <FormLabel  htmlFor='owner'>Respuesta</FormLabel>
                <Select  onChange={handleInputChangeContent} name='answer1' defaultValue=''>
                  <option value='True'>True</option>
                  <option value='False'>False</option>
                </Select>
              </Box>
            <Box>
                <FormLabel htmlFor='username'>Opcion2</FormLabel>
                <Input
                  ref={firstField}
                  name='audio2'
                  placeholder='coloca una opcion de audio'
                  onChange={handleInputChangeContent}
                />
              </Box>
              <Box>
                <FormLabel htmlFor='owner'>Respuesta</FormLabel>
                <Select onChange={handleInputChangeContent} name='answer2' defaultValue=''>
                  <option value='True'>True</option>
                  <option value='False'>False</option>
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor='username'>Opcion3</FormLabel>
                <Input
                  ref={firstField}
                  name='audio3'
                  placeholder='coloca una opcion de audio'
                  onChange={handleInputChangeContent}
                />
              </Box>
              <Box>
                <FormLabel htmlFor='owner'>Respuesta</FormLabel>
                <Select onChange={handleInputChangeContent} name='answer3' defaultValue=''>
                  <option value='True'>True</option>
                  <option value='False'>False</option>
                </Select>
                <Box>
                <FormLabel htmlFor='username'>Opcion4</FormLabel>
                <Input
                  ref={firstField}
                  name='audio4'
                  placeholder='coloca una opcion de audio'
                  onChange={handleInputChangeContent}
                />
              </Box>
              <Box>
                <FormLabel htmlFor='owner'>Respuesta</FormLabel>
                <Select  onChange={handleInputChangeContent} name='answer4' defaultValue=''>
                  <option value='True'>True</option>
                  <option value='False'>False</option>
                </Select>
              </Box>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={handleSubmit}>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )




}