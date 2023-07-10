package utils

import (
	"os"

	"github.com/spf13/viper"
)

type config struct {
	AppEnv       string `mapstructure:"APP_ENV"`
	AppSecret    string `mapstructure:"APP_SECRET"`
	DatabaseURL  string `mapstructure:"DATABASE_URL"`
	Port         string `mapstructure:"PORT"`
	TaskInterval int    `mapstructure:"TASK_INTERVAL"`
}

const configFile = ".env"

var (
	envKeys     = [...]string{"APP_ENV", "APP_SECRET", "DATABASE_URL", "PORT", "TASK_INTERVAL"}
	defaultPort = "3000"

	Config config
)

// LoadConfig loads the config from file and environment variables.
func LoadConfig() error {
	bindEnvKeys()

	viper.AutomaticEnv()
	viper.SetConfigType("env")
	viper.SetConfigFile(configFile)
	if fileExists(configFile) {
		if err := viper.ReadInConfig(); err != nil {
			return err
		}
	}
	if err := viper.Unmarshal(&Config); err != nil {
		return err
	}

	if Config.Port == "" {
		Config.Port = defaultPort
	}

	return nil
}

func bindEnvKeys() {
	for _, key := range envKeys {
		viper.BindEnv(key)
	}
}

func fileExists(fn string) bool {
	info, err := os.Stat(fn)
	if os.IsNotExist(err) {
		return false
	}
	return !info.IsDir()
}
