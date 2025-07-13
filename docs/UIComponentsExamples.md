Badge Usage:
tsximport { Badge } from '@eternal-ui/core'

// Basic usage
<Badge>New</Badge>

// With variants and icons
<Badge variant="success" icon={<CheckIcon />}>
  Export Complete
</Badge>

// Interactive badge
<Badge interactive onClick={handleClick}>
  Click me
</Badge>
Progress Usage:
tsximport { Progress } from '@eternal-ui/core'

// Basic progress
<Progress value={75} />

// With label and percentage
<Progress 
  value={45} 
  label="Exporting components..." 
  showPercentage 
  variant="success"
/>

// Indeterminate loading
<Progress indeterminate label="Processing..." />


Alert Usage:

import { Alert, AlertTitle, AlertDescription } from '@eternal-ui/core'

// Basic alert
<Alert variant="success">
 <AlertTitle>Export Successful!</AlertTitle>
 <AlertDescription>
   Your React components have been generated and are ready for download.
 </AlertDescription>
</Alert>

// Dismissible alert with icon
<Alert 
 variant="warning" 
 dismissible 
 onDismiss={() => console.log('Alert dismissed')}
 icon={<WarningIcon />}
>
 <AlertTitle>Bundle Size Warning</AlertTitle>
 <AlertDescription>
   Your exported bundle is larger than recommended. Consider code splitting.
 </AlertDescription>
</Alert>
Modal Usage:
tsximport { 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalDescription,
  ModalContent,
  ModalFooter 
} from '@eternal-ui/core'

// Export confirmation modal
<Modal 
  open={isExportModalOpen} 
  onClose={() => setIsExportModalOpen(false)}
  title="Export Configuration"
  description="Configure your export settings"
  size="lg"
>
  <ModalHeader onClose={() => setIsExportModalOpen(false)}>
    <ModalTitle>Export to React</ModalTitle>
    <ModalDescription>
      Configure your export settings and generate production-ready code.
    </ModalDescription>
  </ModalHeader>
  
  <ModalContent>
    {/* Your export configuration form */}
    <ExportConfigurationForm />
  </ModalContent>
  
  <ModalFooter>
    <Button variant="outline" onClick={() => setIsExportModalOpen(false)}>
      Cancel
    </Button>
    <Button onClick={handleExport}>
      Export Project
    </Button>
  </ModalFooter>
</Modal>



Integration with Export Demo
These components are specifically designed for the Export Demo functionality:
For Framework Selection:
// Framework badges
<Badge 
  variant={selectedFramework === 'react' ? 'default' : 'outline'}
  interactive
  onClick={() => setSelectedFramework('react')}
>
  React
</Badge>
For Export Progress:
tsx// Export progress tracking
<Progress 
  value={exportProgress} 
  label="Generating components..."
  showPercentage
  variant="default"
/>
For Export Status:
tsx// Success notification
<Alert variant="success" icon={<CheckCircleIcon />}>
  <AlertTitle>Export Complete!</AlertTitle>
  <AlertDescription>
    Generated {fileCount} files in {duration}ms
  </AlertDescription>
</Alert>

// Error handling
<Alert variant="destructive" dismissible>
  <AlertTitle>Export Failed</AlertTitle>
  <AlertDescription>
    {errorMessage}
  </AlertDescription>
</Alert>
For Configuration Modal:
tsx// Export configuration
<Modal open={showConfig} onClose={closeConfig} size="lg">
  <ModalHeader onClose={closeConfig}>
    <ModalTitle>Export Settings</ModalTitle>
  </ModalHeader>
  <ModalContent>
    {/* Configuration options */}
  </ModalContent>
  <ModalFooter>
    <Button onClick={handleExport}>Export</Button>
  </ModalFooter>
</Modal>