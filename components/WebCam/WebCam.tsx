import handleTxError from "@/lib/handleTxError"
import { usePageLoad } from "@/providers/PageLoadProvider"
import { useEffect, useRef, useState } from "react"

const WebCam = () => {
  const { granted, setGranted } = usePageLoad()
  const [stream, setStream] = useState(null)
  const videoRef = useRef(null)

  const onClick = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setStream(mediaStream)
      setGranted(true)
    } catch (error) {
      handleTxError(error)
    }
  }

  useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream
      videoRef.current.muted = true
      videoRef.current.play()
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  return (
    <div className="w-full h-full">
      {!granted && (
        <button
          type="button"
          className="w-full h-full flex justify-center items-center"
          onClick={onClick}
        >
          <p className="text-white text-xl">WebCam</p>
        </button>
      )}
      {granted && (
        <video id="vid" ref={videoRef} autoPlay playsInline muted className="w-full h-full" />
      )}
    </div>
  )
}

export default WebCam