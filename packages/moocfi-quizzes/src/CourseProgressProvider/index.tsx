import * as React from "react"
import { useContext, useEffect, useState } from "react"
import CourseProgressProviderContext, {
  CourseProgressProviderInterface,
} from "../contexes/courseProgressProviderContext"
import { PointsByGroup } from "../modelTypes"
import { getUserCourseData } from "../services/courseProgressService"

import { w3cwebsocket as W3CWebSocket } from "websocket"

const client = new W3CWebSocket("ws://127.0.0.1:9000", "echo-protocol")

interface CourseProgressProviderProps {
  accessToken: string
  courseId: string
}

export const CourseProgressProvider: React.FunctionComponent<
  CourseProgressProviderProps
> = ({ accessToken, courseId, children }) => {
  const [data, setData] = useState<any>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected")
      const sendToken = () => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify([accessToken, courseId]))
        }
      }
      sendToken()
    }
    fetchProgressData()
  }, [])

  client.onmessage = message => {
    if (message.data === "ping") {
      fetchProgressData()
    }
  }

  client.onclose = e => {}

  const fetchProgressData = async () => {
    try {
      setLoading(true)
      const data = await getUserCourseData(courseId, accessToken)
      setData(data)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }

  const refreshProgress = () => {
    setLoading(true)
    setTimeout(() => fetchProgressData(), 1000)
  }

  const value = {
    refreshProgress,
    error,
    loading,
    userCourseProgress: data.userCourseProgress,
    requiredActions: data.requiredActions,
  }

  return (
    <CourseProgressProviderContext.Provider value={value}>
      {children}
    </CourseProgressProviderContext.Provider>
  )
}

export const injectCourseProgress = <P extends CourseProgressProviderInterface>(
  Component: React.FunctionComponent<P> | React.ComponentType<P>,
): React.FunctionComponent<P & CourseProgressProviderInterface> => (
  props: P,
) => {
  const injectProps = useContext(CourseProgressProviderContext)
  return <Component {...props} {...injectProps} />
}
