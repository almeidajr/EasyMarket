package tasks

import (
	"log"
	"time"

	"emscraper/services"
	"emscraper/utils"
)

// Run runs a background task at a predefined interval
func Run() {
	go func() {
		i := utils.Config.TaskInterval
		d := time.Duration(i) * time.Hour

		if i == 0 {
			log.Println("Task interval is set to 0, task will not run")
			return
		}

		log.Printf("Background tasks have been set to run every %d hours\n", i)

		var n int
		for {
			n++
			queue := services.GetQueue()
			log.Printf(
				"Background task [%02d] started, %02d itens in queue\n", n, len(queue))

			for _, t := range queue {
				_, result := services.FindNFCE(t.URL, t.UserID)
				if result.RowsAffected != 0 {
					services.Dequeue(t)
					continue
				}

				if _, err := services.ScrapeAndStore(t.URL, t.UserID); err != nil {
					continue
				}

				services.Dequeue(t)
			}

			log.Printf("Background task [%02d] finished\n", n)
			time.Sleep(d)
		}
	}()
}
