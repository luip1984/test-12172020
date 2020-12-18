const CountdownService = async (seconds: number, onTick: any) => {
        if (seconds <= 0) {
          return;
        }

        return new Promise((resolve) => {
          setTimeout(() => {
            const timeRemaining = seconds - 1;
            onTick(timeRemaining);

            resolve(CountdownService(timeRemaining, onTick));
          }, 1000);
        });
};

export default CountdownService;