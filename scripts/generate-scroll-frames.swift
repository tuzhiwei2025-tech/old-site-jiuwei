import AVFoundation
import Foundation
import ImageIO
import UniformTypeIdentifiers

struct SequenceConfig {
  let source: String
  let output: String
  let fps: Double
  let maximumWidth: Int
  let end: Double?
  let start: Double
}

let projectRoot = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let sequences = [
  SequenceConfig(source: "public/视频-2.mp4", output: "public/homepage-experience/frames/hero", fps: 24, maximumWidth: 864, end: 3.021, start: 0),
  SequenceConfig(source: "public/视频-3.mp4", output: "public/homepage-experience/frames/series", fps: 18, maximumWidth: 864, end: 3.021, start: 0),
  SequenceConfig(source: "public/视频-3.mp4", output: "public/homepage-experience/frames/operations", fps: 18, maximumWidth: 864, end: nil, start: 3.021),
]

func writeJPEG(_ image: CGImage, to url: URL) throws {
  guard let destination = CGImageDestinationCreateWithURL(url as CFURL, UTType.jpeg.identifier as CFString, 1, nil) else {
    throw NSError(domain: "scroll-frames", code: 1)
  }

  CGImageDestinationAddImage(destination, image, [kCGImageDestinationLossyCompressionQuality: 0.76] as CFDictionary)
  guard CGImageDestinationFinalize(destination) else {
    throw NSError(domain: "scroll-frames", code: 2)
  }
}

func resizedImage(_ image: CGImage, maximumWidth: Int) -> CGImage {
  guard image.width > maximumWidth else { return image }
  let width = maximumWidth
  let height = Int((Double(image.height) * Double(width) / Double(image.width)).rounded())
  let colorSpace = CGColorSpaceCreateDeviceRGB()
  let context = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 0, space: colorSpace, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
  context.interpolationQuality = .high
  context.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))
  return context.makeImage()!
}

for sequence in sequences {
  let input = projectRoot.appendingPathComponent(sequence.source)
  let output = projectRoot.appendingPathComponent(sequence.output)
  let fileManager = FileManager.default

  try? fileManager.removeItem(at: output)
  try fileManager.createDirectory(at: output, withIntermediateDirectories: true)

  let asset = AVURLAsset(url: input)
  let duration = CMTimeGetSeconds(asset.duration)
  let end = min(duration, sequence.end ?? duration)
  let range = max(0.001, end - sequence.start)
  let frameCount = max(1, Int((range * sequence.fps).rounded(.up)))
  let generator = AVAssetImageGenerator(asset: asset)
  generator.appliesPreferredTrackTransform = true
  generator.requestedTimeToleranceBefore = .zero
  generator.requestedTimeToleranceAfter = .zero

  for index in 0..<frameCount {
    let seconds = min(sequence.start + Double(index) / sequence.fps, max(sequence.start, end - 0.001))
    let time = CMTime(seconds: seconds, preferredTimescale: 600)
    let image = try generator.copyCGImage(at: time, actualTime: nil)
    let name = String(format: "frame-%04d.jpg", index)
    try writeJPEG(resizedImage(image, maximumWidth: sequence.maximumWidth), to: output.appendingPathComponent(name))
  }

  print("\(sequence.output): \(frameCount) frames")
}
