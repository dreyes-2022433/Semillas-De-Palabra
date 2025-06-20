import {
  Card, CardBody, CardFooter, ButtonGroup, Button, Image, Text, AspectRatio, Box,
  Stack, Heading, Divider, Select, FormControl, FormLabel, VStack, HStack, SimpleGrid, Flex
} from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import './ContentPage.css'
import { getModuleRequest } from '../../services/api'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export const Content = () => {
  const [module, setModule] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()
  const [answers, setAnswers] = useState({})
  const [feedback, setFeedback] = useState({})
  const audioRefs = useRef({})

  const fetchModule = async () => {
    const res = await getModuleRequest(id)
    setModule(res.data.module[0] || {})
  }

  useEffect(() => {
    fetchModule()
  }, [])

  const handleSelectChange = (resourceId, inputIdx, value, options) => {
    setAnswers(prev => ({
      ...prev,
      [resourceId]: {
        ...prev[resourceId],
        [inputIdx]: value
      }
    }))
    // Reproducir el audio seleccionado
    const selectedOption = options.find(opt => opt.key === value)
    if (selectedOption) {
      playAudio(selectedOption.label, resourceId)
    }
  }

  const playAudio = (text, moduleId) => {
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio && !audio.paused) {
        audio.pause()
        audio.currentTime = 0
      }
    })
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "es-ES"
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 1
      speechSynthesis.speak(utterance)
    }
  }

  const stopAudio = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
    }
  }

  // Compara el audio seleccionado con el name del objeto
  const handleCheckAnswer = (resource) => {
    const selected = answers[resource.refId]?.selected
    if (!selected) return
    const selectedText = resource.data[selected]
    const isCorrect = selectedText === resource.data.name
    setFeedback(prev => ({
      ...prev,
      [resource.refId]: isCorrect ? '¡Correcto!' : 'Incorrecto'
    }))
  }

  return (
    <div className="centered-container">
      <div className="centered-content">
        {module.resources && module.resources.length > 0 && (
          <>
            <Heading mb={2} color="teal.700">{module.name}</Heading>
            <Text mb={4} color="gray.600">{module.description}</Text>
            {/* Centrar el video */}
            {module.resources.some(r => r.kind === "VideoLesson") && (
              <Flex w="100%" justify="center" mb={8}>
                <Box maxW="700px" w="100%" bg="gray.100" borderRadius="lg" p={4} boxShadow="md">
                  <Heading size="md" mb={2} color="teal.600">Video</Heading>
                  {module.resources.filter(r => r.kind === "VideoLesson").map(resource => (
                    <AspectRatio key={resource.refId} ratio={16 / 9}>
                      <iframe
                        title={resource.data.name}
                        src={resource.data.video}
                        allowFullScreen
                        style={{ borderRadius: '8px' }}
                      />
                    </AspectRatio>
                  ))}
                </Box>
              </Flex>
            )}
            {/* Grid de recursos tipo imagen */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {module.resources.filter(r => r.kind === "ImageQuestion").map((resource, idx) => {
                const options = [
                  { key: 'audio1', label: resource.data.audio1 },
                  { key: 'audio2', label: resource.data.audio2 },
                  { key: 'audio3', label: resource.data.audio3 },
                  { key: 'audio4', label: resource.data.audio4 }
                ]
                return (
                  <Card key={resource.refId} maxW='lg' boxShadow="lg" borderRadius="xl" p={4}>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <Heading size='md' color="teal.600">{resource.data.name}</Heading>
                        <Image
                          src={resource.data.img}
                          alt={resource.data.name}
                          borderRadius='lg'
                          boxShadow="md"
                          maxH="200px"
                          objectFit="contain"
                          onMouseEnter={() => playAudio(resource.data.mainAudio || resource.data.name, resource.refId)}
                          onMouseLeave={stopAudio}
                        />
                        <Text color="gray.500" fontSize="sm">Selecciona la respuesta correcta:</Text>
                        <FormControl>
                          <FormLabel>Respuesta</FormLabel>
                          <Select
                            placeholder="Selecciona una opción"
                            value={answers[resource.refId]?.selected || ''}
                            onChange={e =>
                              handleSelectChange(resource.refId, 'selected', e.target.value, options)
                            }
                          >
                            {options.map(opt => (
                              <option key={opt.key} value={opt.key}>{opt.label}</option>
                            ))}
                          </Select>
                        </FormControl>
                        {feedback[resource.refId] && (
                          <Text color={feedback[resource.refId] === '¡Correcto!' ? 'green.500' : 'red.500'} fontWeight="bold">
                            {feedback[resource.refId]}
                          </Text>
                        )}
                      </VStack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing='2'>
                        <Button
                          variant='solid'
                          colorScheme='teal'
                          onClick={() => handleCheckAnswer(resource)}
                        >
                          Enviar respuesta
                        </Button>
                        <Button variant='ghost' colorScheme='teal'>
                          Omitir
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                )
              })}
              <Button
                className="back-button glass"
                onClick={() => navigate('/main')}
              >
                <span className="arrow">←</span>
                Volver a la página principal
              </Button>
            </SimpleGrid>
          </>
        )}
      </div>
    </div>
  )
}