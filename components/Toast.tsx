import { Toast, useToastController, useToastState } from '@tamagui/toast'
import React from 'react'
import { Button, Label, Switch, XStack, YStack } from 'tamagui'

// Main component
export const ToastDemo = () => {
  const [native, setNative] = React.useState(false)

  return (
    <YStack space alignItems="center">
      <ToastControl native={native} />
      <CurrentToast />

      <NativeOptions native={native} setNative={setNative} />
    </YStack>
  )
}

const CurrentToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) return null
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <Toast.Title>{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}

// Save product and show toast
const saveProduct = (productName: string, toast: any, native: boolean) => {

  const isSavedSuccessfully = true 

  if (isSavedSuccessfully) {
    // Show success toast after saving the product
    toast.show('Product saved successfully!', {
      message: `${productName} has been saved.`,
      native,
    })
  } else {
    // Handle failure (optional)
    toast.show('Error saving product', {
      message: 'There was an issue saving the product.',
      native,
    })
  }
}

const ToastControl = ({ native }: { native: boolean }) => {
  const toast = useToastController()
  
  return (
    <XStack gap="$2" justifyContent="center">
      <Button
        onPress={() => {
          const productName = 'Product A' 
          saveProduct(productName, toast, native)
        }}
      >
        Save Product
      </Button>
      <Button
        onPress={() => {
          toast.hide()
        }}
      >
        Hide
      </Button>
    </XStack>
  )
}

const NativeOptions = ({
  native,
  setNative,
}: {
  native: boolean
  setNative: (native: boolean) => void
}) => {
  return (
    <XStack gap="$3">
      <Label size="$1" onPress={() => setNative(false)}>
        Custom
      </Label>
      <Switch
        id="native-toggle"
        nativeID="native-toggle"
        theme="active"
        size="$1"
        checked={!!native}
        onCheckedChange={(val) => setNative(val)}
      >
        <Switch.Thumb
          animation={[ 'quick', { transform: { overshootClamping: true } } ]}
        />
      </Switch>

      <Label size="$1" onPress={() => setNative(true)}>
        Native
      </Label>
    </XStack>
  )
}
