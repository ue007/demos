import cv2

src = cv2.imread("car.png")
cv2.namedWindow("input", cv2.WINDOW_AUTOSIZE)
cv2.imshow("input", src)
cv2.waitKey(0)
cv2.destroyAllWindows()