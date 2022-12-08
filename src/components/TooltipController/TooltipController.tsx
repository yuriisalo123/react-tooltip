import { useEffect, useState } from 'react'
import { Tooltip } from 'components/Tooltip'
import type {
  EventsType,
  PositionStrategy,
  PlacesType,
  VariantType,
  WrapperType,
} from 'components/Tooltip/TooltipTypes'
import { useTooltip } from 'components/TooltipProvider'
import { dataAttributesKeys } from './constants'
import type { ITooltipController } from './TooltipControllerTypes'

const TooltipController = ({
  id,
  anchorId,
  content,
  html,
  className,
  classNameArrow,
  variant = 'dark',
  place = 'top',
  offset = 10,
  wrapper = 'div',
  children = null,
  events = ['hover'],
  positionStrategy = 'absolute',
  delayShow = 0,
  delayHide = 0,
  style,
  isOpen,
  setIsOpen,
}: ITooltipController) => {
  const [tooltipContent, setTooltipContent] = useState(content || html)
  const [tooltipPlace, setTooltipPlace] = useState(place)
  const [tooltipVariant, setTooltipVariant] = useState(variant)
  const [tooltipOffset, setTooltipOffset] = useState(offset)
  const [tooltipDelayShow, setTooltipDelayShow] = useState(delayShow)
  const [tooltipDelayHide, setTooltipDelayHide] = useState(delayHide)
  const [tooltipWrapper, setTooltipWrapper] = useState<WrapperType>(wrapper)
  const [tooltipEvents, setTooltipEvents] = useState<EventsType[]>(events)
  const [tooltipPositionStrategy, setTooltipPositionStrategy] =
    useState<PositionStrategy>(positionStrategy)
  const [isHtmlContent, setIsHtmlContent] = useState<boolean>(Boolean(html))
  const { anchorRefs, activeAnchor } = useTooltip()

  const getDataAttributesFromAnchorElement = (elementReference: HTMLElement) => {
    const dataAttributes = elementReference?.getAttributeNames().reduce((acc, name) => {
      if (name.includes('data-tooltip-')) {
        ;(acc as any)[name] = elementReference?.getAttribute(name)
      }

      return acc
    }, {})

    return dataAttributes
  }

  const applyAllDataAttributesFromAnchorElement = (dataAttributes: {
    [key: string]: string | number | boolean
  }) => {
    const keys = Object.keys(dataAttributes)
    let formatedKey = null

    const handleDataAttributes = {
      place: (value: PlacesType) => {
        setTooltipPlace(value)
      },
      content: (value: string) => {
        setIsHtmlContent(false)
        setTooltipContent(value)
      },
      html: (value: string) => {
        setIsHtmlContent(true)
        setTooltipContent(value)
      },
      variant: (value: VariantType) => {
        setTooltipVariant(value)
      },
      offset: (value: number) => {
        setTooltipOffset(value)
      },
      wrapper: (value: WrapperType) => {
        setTooltipWrapper(value)
      },
      events: (value: string) => {
        const parsedEvents = value.split(' ')
        setTooltipEvents(parsedEvents as EventsType[])
      },
      'position-strategy': (value: PositionStrategy) => {
        setTooltipPositionStrategy(value)
      },
      'delay-show': (value: number) => {
        setTooltipDelayShow(Number(value))
      },
      'delay-hide': (value: number) => {
        setTooltipDelayHide(Number(value))
      },
    }

    keys.forEach((key) => {
      formatedKey = key.replace('data-tooltip-', '')

      if (dataAttributesKeys.includes(formatedKey)) {
        // @ts-ignore
        handleDataAttributes[formatedKey](dataAttributes[key])
      }
    })
  }

  const getElementSpecificAttributeKeyAndValueParsed = ({
    element,
    attributeName,
  }: {
    element: HTMLElement
    attributeName: string
  }) => {
    return { [attributeName]: element.getAttribute(attributeName) }
  }

  useEffect(() => {
    if (content) {
      setTooltipContent(content)
    }
    if (html) {
      setTooltipContent(html)
    }
  }, [content, html])

  useEffect(() => {
    const elementRefs = new Set(anchorRefs)

    const anchorById = document.querySelector(`[id='${anchorId}']`)
    if (anchorById) {
      elementRefs.add({ current: anchorById as HTMLElement })
    }

    if (!elementRefs.size) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    }

    // do not check for subtree and childrens, we only want to know attribute changes
    // to stay watching `data-attributes` from anchor element
    const observerConfig = { attributes: true, childList: false, subtree: false }

    const observerCallback = (mutationList: any) => {
      mutationList.forEach((mutation: any) => {
        if (!activeAnchor.current) {
          return
        }
        if (mutation.type === 'attributes') {
          const attributeKeyAndValue = getElementSpecificAttributeKeyAndValueParsed({
            element: activeAnchor.current,
            attributeName: mutation.attributeName,
          })

          applyAllDataAttributesFromAnchorElement(
            attributeKeyAndValue as { [key: string]: string | number | boolean },
          )
        }
      })
    }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(observerCallback)

    elementRefs.forEach((ref) => {
      if (!ref.current) {
        return
      }
      // Start observing the target nodes for configured mutations
      observer.observe(ref.current, observerConfig)
    })

    if (anchorById) {
      const dataAttributes = getDataAttributesFromAnchorElement(anchorById as HTMLElement)
      applyAllDataAttributesFromAnchorElement(dataAttributes)
    }

    return () => {
      // Remove the observer when the tooltip is destroyed
      observer.disconnect()
    }
  }, [anchorRefs, activeAnchor, anchorId])

  useEffect(() => {
    if (!activeAnchor.current) {
      return
    }
    const dataAttributes = getDataAttributesFromAnchorElement(activeAnchor.current)
    applyAllDataAttributesFromAnchorElement(dataAttributes)
  }, [activeAnchor])

  const props = {
    id,
    anchorId,
    className,
    classNameArrow,
    content: tooltipContent,
    isHtmlContent,
    place: tooltipPlace,
    variant: tooltipVariant,
    offset: tooltipOffset,
    wrapper: tooltipWrapper,
    events: tooltipEvents,
    positionStrategy: tooltipPositionStrategy,
    delayShow: tooltipDelayShow,
    delayHide: tooltipDelayHide,
    style,
    isOpen,
    setIsOpen,
  }

  return children ? <Tooltip {...props}>{children}</Tooltip> : <Tooltip {...props} />
}

export default TooltipController
